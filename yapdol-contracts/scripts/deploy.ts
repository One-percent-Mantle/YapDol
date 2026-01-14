import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("=".repeat(50));
  console.log("YapDol Contract Deployment");
  console.log("=".repeat(50));
  console.log("Deployer address:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "MNT");
  console.log("");

  // Use deployer as signer for simplicity (in production, use separate signer)
  const signerAddress = process.env.BACKEND_SIGNER_ADDRESS || deployer.address;
  console.log("Backend signer address:", signerAddress);
  console.log("");

  // Deploy ArtistTokenFactory
  console.log("Deploying ArtistTokenFactory...");
  const Factory = await ethers.getContractFactory("ArtistTokenFactory");
  const factory = await Factory.deploy(signerAddress);
  await factory.waitForDeployment();

  const factoryAddress = await factory.getAddress();
  console.log("ArtistTokenFactory deployed to:", factoryAddress);
  console.log("");

  // Create initial artist tokens (matching database IDs)
  const artists = [
    { id: 1, name: "MINJI Token", symbol: "MINJI" },
    { id: 2, name: "HAERIN Token", symbol: "HAERIN" },
    { id: 3, name: "DANIELLE Token", symbol: "DANIELLE" },
    { id: 4, name: "HANNI Token", symbol: "HANNI" },
    { id: 5, name: "SULYOON Token", symbol: "SULYOON" },
    { id: 6, name: "SOHEE Token", symbol: "SOHEE" },
    { id: 7, name: "KAI Token", symbol: "KAI" },
    { id: 8, name: "JUN Token", symbol: "JUN" },
    { id: 10, name: "JENNIE Token", symbol: "JENNIE" },
  ];

  console.log("Creating artist tokens...");
  console.log("-".repeat(50));

  for (const artist of artists) {
    try {
      const tx = await factory.createArtistToken(artist.id, artist.name, artist.symbol);
      await tx.wait();
      const tokenAddress = await factory.artistTokens(artist.id);
      console.log(`${artist.symbol} (ID: ${artist.id}): ${tokenAddress}`);
    } catch (error: any) {
      console.log(`${artist.symbol} (ID: ${artist.id}): Failed - ${error.message}`);
    }
  }

  console.log("");
  console.log("=".repeat(50));
  console.log("Deployment Complete!");
  console.log("=".repeat(50));
  console.log("");
  console.log("Save these addresses for frontend integration:");
  console.log(`FACTORY_ADDRESS=${factoryAddress}`);
  console.log(`SIGNER_ADDRESS=${signerAddress}`);
  console.log("");
  console.log("Next steps:");
  console.log("1. Copy FACTORY_ADDRESS to backend .env");
  console.log("2. Copy FACTORY_ADDRESS to frontend contracts config");
  console.log("3. Set up backend signer private key");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
