import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import {  } from '@onchain-id/identity-sdk';
import ONCHAINID from "@onchain-id/solidity";
import { ClaimTopicsRegistry, ClaimTopicsRegistry__factory, DefaultCompliance, DefaultCompliance__factory, IdentityRegistry, IdentityRegistryStorage, IdentityRegistryStorage__factory, IdentityRegistry__factory, Token, Token__factory, TrustedIssuersRegistry, TrustedIssuersRegistry__factory } from '../typechain';

async function main() {
    const [owner, add1, add2] = await ethers.getSigners();

    const identityFactory = new ethers.ContractFactory(
      ONCHAINID.contracts.Identity.abi,
      ONCHAINID.contracts.Identity.bytecode,
      owner
    );

    const identity1 = await identityFactory.deploy(
        await owner.getAddress(),
        false,
    );
    // waiting for the contract to be deployed
    await identity1.deployed(); 
    console.log("Identity 1 Address = ", identity1.address);

    const identity2 = await identityFactory.deploy(
      await owner.getAddress(),
      false,
    );
    // waiting for the contract to be deployed
    await identity2.deployed(); 
    console.log("Identity 2 Address = ", identity2.address);

    const IdentityRegistry:IdentityRegistry__factory = await ethers.getContractFactory("IdentityRegistry");
    const identityRegistry:IdentityRegistry = await IdentityRegistry.attach("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");
    console.log("IdentityRegistry deployed to:", identityRegistry.address);

    //console.log(await identityRegistry.isAgent(owner.address));

    const txtIdentity1Registry = await identityRegistry.registerIdentity(add1.address,identity1.address,91);
    await txtIdentity1Registry.wait();
    console.log("Transaction txtIdentity1Registry hash = ", txtIdentity1Registry.hash);
    //const txtIdentity2Registry = await identityRegistry.registerIdentity(add2.address, identity2.address,101);
    
    /*
    const Token:Token__factory = await ethers.getContractFactory("Token");
    const token:Token = await Token.attach("0xa5eA91EE6b31EFc14B58dd8540B51264DC12DBd9")

    console.log("Token deployed to:", token.address);

    await token.addAgentOnTokenContract(owner.address);
    //token.iden

    const txt1 = await token.mint(owner.address,2);
    console.log("Token mint transaction hash = ",txt1.hash);
    const receipt = await txt1.wait();
    console.log("Token mint receipt = ",receipt);
    */

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
