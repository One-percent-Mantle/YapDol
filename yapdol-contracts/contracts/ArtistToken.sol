// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ArtistToken
 * @dev ERC20 token for individual artists in the YapDol platform
 * @notice Each artist has their own token instance managed by the Factory
 */
contract ArtistToken is ERC20, Ownable {
    uint256 public immutable artistId;

    constructor(
        uint256 _artistId,
        string memory _name,
        string memory _symbol,
        address _factory
    ) ERC20(_name, _symbol) Ownable(_factory) {
        artistId = _artistId;
    }

    /**
     * @dev Mint new tokens - only callable by the Factory (owner)
     * @param to Address to receive the tokens
     * @param amount Amount of tokens to mint (in wei, 18 decimals)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Burn tokens from caller's balance
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
