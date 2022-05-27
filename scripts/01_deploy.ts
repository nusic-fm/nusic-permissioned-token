import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { IdentitySDK } from '@onchain-id/identity-sdk';
import { ClaimTopicsRegistry, ClaimTopicsRegistry__factory, DefaultCompliance, DefaultCompliance__factory, IdentityRegistry, IdentityRegistryStorage, IdentityRegistryStorage__factory, IdentityRegistry__factory, Token, Token__factory, TrustedIssuersRegistry, TrustedIssuersRegistry__factory } from '../typechain';

async function main() {
    const [owner, add1] = await ethers.getSigners();

    const ClaimTopicsRegistry:ClaimTopicsRegistry__factory = await ethers.getContractFactory("ClaimTopicsRegistry");
    const claimTopicsRegistry:ClaimTopicsRegistry = await ClaimTopicsRegistry.deploy();
    await claimTopicsRegistry.deployed();

    console.log("ClaimTopicsRegistry deployed to:", claimTopicsRegistry.address);

    const TrustedIssuersRegistry:TrustedIssuersRegistry__factory = await ethers.getContractFactory("TrustedIssuersRegistry");
    const trustedIssuersRegistry:TrustedIssuersRegistry = await TrustedIssuersRegistry.deploy();
    await trustedIssuersRegistry.deployed();
    console.log("TrustedIssuersRegistry deployed to:", trustedIssuersRegistry.address);

    const DefaultCompliance:DefaultCompliance__factory = await ethers.getContractFactory("DefaultCompliance");
    const defaultCompliance:DefaultCompliance = await DefaultCompliance.deploy();
    await defaultCompliance.deployed();
    console.log("DefaultCompliance deployed to:", defaultCompliance.address);

    const IdentityRegistryStorage:IdentityRegistryStorage__factory = await ethers.getContractFactory("IdentityRegistryStorage");
    const identityRegistryStorage:IdentityRegistryStorage = await IdentityRegistryStorage.deploy();
    await identityRegistryStorage.deployed();
    console.log("IdentityRegistryStorage deployed to:", identityRegistryStorage.address);

    const IdentityRegistry:IdentityRegistry__factory = await ethers.getContractFactory("IdentityRegistry");
    const identityRegistry:IdentityRegistry = await IdentityRegistry.deploy(trustedIssuersRegistry.address, claimTopicsRegistry.address, identityRegistryStorage.address);
    await identityRegistry.deployed();
    console.log("IdentityRegistry deployed to:", identityRegistry.address);

    const Token:Token__factory = await ethers.getContractFactory("Token");
    const token:Token = await Token.deploy();
    await token.deployed();
    console.log("Token deployed to:", token.address);

    const txt1 = await token.init(identityRegistry.address, defaultCompliance.address,"NUSIC","NUSIC", owner.address);
    console.log("Token init transaction hash = ",txt1.hash);
    const receipt = await txt1.wait();
    //console.log("Token init receipt = ",receipt);

    const txt2 = await token.addAgentOnTokenContract(owner.address);
    await txt2.wait();
    console.log("Token addAgentOnTokenContract transaction hash = ",txt2.hash);
    
    const txt3 = await identityRegistry.addAgentOnIdentityRegistryContract(owner.address);
    await txt3.wait();
    console.log("identityRegistry addAgentOnIdentityRegistryContract transaction hash = ",txt3.hash);

    const txt4 = await identityRegistryStorage.addAgent(owner.address);
    await txt4.wait();
    console.log("identityRegistryStorage addAgent transaction hash = ",txt4.hash);

    //console.log(await identityRegistry.isAgent(owner.address));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
