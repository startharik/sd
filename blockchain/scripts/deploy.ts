import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // 1. Deploy Mock Stablecoin
  const MockStablecoin = await ethers.getContractFactory("MockStablecoin");
  const stablecoin = await MockStablecoin.deploy("Mock USDC", "mUSDC", deployer.address);
  await stablecoin.waitForDeployment();
  console.log("MockStablecoin deployed to:", await stablecoin.getAddress());

  // 2. Deploy UAT Token
  const UATToken = await ethers.getContractFactory("UATToken");
  const uatToken = await UATToken.deploy("Universal Action Token", "UAT", deployer.address);
  await uatToken.waitForDeployment();
  console.log("UATToken deployed to:", await uatToken.getAddress());

  // 3. Deploy Revenue Engine
  const RevenueEngine = await ethers.getContractFactory("RevenueEngine");
  const revenueEngine = await RevenueEngine.deploy(await uatToken.getAddress(), await stablecoin.getAddress(), deployer.address);
  await revenueEngine.waitForDeployment();
  console.log("RevenueEngine deployed to:", await revenueEngine.getAddress());

  // 4. Deploy Treasury
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(deployer.address);
  await treasury.waitForDeployment();
  console.log("Treasury deployed to:", await treasury.getAddress());

  console.log("\nDeployment complete! Update your frontend .env.local with these addresses.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
