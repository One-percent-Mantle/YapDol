// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ArtistToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ArtistTokenFactory
 * @dev Factory contract for creating and managing Artist tokens
 * @notice Handles token creation and signature-based minting for the YapDol platform
 */
contract ArtistTokenFactory is Ownable, ReentrancyGuard {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    /// @notice Backend signer address that authorizes token swaps
    address public signer;

    /// @notice Mapping from artistId to their token contract address
    mapping(uint256 => address) public artistTokens;

    /// @notice Mapping to track used nonces (prevents signature replay)
    mapping(bytes32 => bool) public usedNonces;

    /// @notice List of all artist IDs that have tokens
    uint256[] public artistIds;

    // Events
    event TokenCreated(uint256 indexed artistId, address tokenAddress, string name, string symbol);
    event TokensMinted(uint256 indexed artistId, address indexed to, uint256 amount, uint256 nonce);
    event SignerUpdated(address indexed oldSigner, address indexed newSigner);

    /**
     * @dev Constructor
     * @param _signer Address that will sign swap authorization messages
     */
    constructor(address _signer) Ownable(msg.sender) {
        require(_signer != address(0), "Invalid signer address");
        signer = _signer;
    }

    /**
     * @dev Update the signer address
     * @param _newSigner New signer address
     */
    function setSigner(address _newSigner) external onlyOwner {
        require(_newSigner != address(0), "Invalid signer address");
        emit SignerUpdated(signer, _newSigner);
        signer = _newSigner;
    }

    /**
     * @dev Create a new Artist token
     * @param artistId Unique identifier for the artist
     * @param name Token name (e.g., "MINJI Token")
     * @param symbol Token symbol (e.g., "MINJI")
     * @return tokenAddress Address of the newly created token
     */
    function createArtistToken(
        uint256 artistId,
        string memory name,
        string memory symbol
    ) external onlyOwner returns (address tokenAddress) {
        require(artistTokens[artistId] == address(0), "Token already exists for this artist");

        ArtistToken token = new ArtistToken(
            artistId,
            name,
            symbol,
            address(this)
        );

        tokenAddress = address(token);
        artistTokens[artistId] = tokenAddress;
        artistIds.push(artistId);

        emit TokenCreated(artistId, tokenAddress, name, symbol);
    }

    /**
     * @dev Swap Hype Points for Artist Tokens using backend signature
     * @param artistId Artist ID to receive tokens for
     * @param hypePoints Amount of hype points being spent (for verification)
     * @param tokensToMint Amount of tokens to mint (whole units, will be multiplied by 10^18)
     * @param nonce Unique nonce to prevent replay attacks
     * @param signature Backend signature authorizing this swap
     */
    function swapPointsForTokens(
        uint256 artistId,
        uint256 hypePoints,
        uint256 tokensToMint,
        uint256 nonce,
        bytes memory signature
    ) external nonReentrant {
        // Verify token exists
        address tokenAddress = artistTokens[artistId];
        require(tokenAddress != address(0), "Artist token does not exist");

        // Create message hash
        bytes32 messageHash = keccak256(abi.encodePacked(
            msg.sender,
            artistId,
            hypePoints,
            tokensToMint,
            nonce
        ));

        // Check nonce hasn't been used
        require(!usedNonces[messageHash], "Nonce already used");

        // Verify signature
        bytes32 ethSignedHash = messageHash.toEthSignedMessageHash();
        address recoveredSigner = ethSignedHash.recover(signature);
        require(recoveredSigner == signer, "Invalid signature");

        // Mark nonce as used
        usedNonces[messageHash] = true;

        // Mint tokens (convert to 18 decimals)
        uint256 mintAmount = tokensToMint * 10**18;
        ArtistToken(tokenAddress).mint(msg.sender, mintAmount);

        emit TokensMinted(artistId, msg.sender, mintAmount, nonce);
    }

    /**
     * @dev Get all artist IDs that have tokens
     * @return Array of artist IDs
     */
    function getAllArtistIds() external view returns (uint256[] memory) {
        return artistIds;
    }

    /**
     * @dev Get total number of artist tokens created
     * @return Number of artist tokens
     */
    function getArtistTokenCount() external view returns (uint256) {
        return artistIds.length;
    }

    /**
     * @dev Check if a nonce has been used for a specific user and parameters
     * @param user User address
     * @param artistId Artist ID
     * @param hypePoints Hype points amount
     * @param tokensToMint Tokens to mint amount
     * @param nonce Nonce to check
     * @return True if nonce has been used
     */
    function isNonceUsed(
        address user,
        uint256 artistId,
        uint256 hypePoints,
        uint256 tokensToMint,
        uint256 nonce
    ) external view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(
            user,
            artistId,
            hypePoints,
            tokensToMint,
            nonce
        ));
        return usedNonces[messageHash];
    }
}
