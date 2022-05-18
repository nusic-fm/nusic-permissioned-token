import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { IdentitySDK } from '@onchain-id/identity-sdk';
//import { OnchainID } from '@onchain-id/solidity';
const OnchainID = require('@onchain-id/solidity');

async function main() {
    const [owner, add1] = await ethers.getSigners();

    console.log(" api key alchemy = ",process.env.ALCHEMY_KEY);
    
    const provider = ethers.getDefaultProvider('rinkeby', {
        alchemy: process.env.ALCHEMY_KEY
    });
    const private_key = process.env.RINKEBY_PRIVATE_KEY||"";;
    console.log("Private key = ",private_key)
    
    const signer = new ethers.Wallet(private_key, provider);

    const implementation = await new ethers.ContractFactory(
      OnchainID.contracts.Identity.abi,
      OnchainID.contracts.Identity.bytecode,
      signer
    ).deploy(
      signer.address,
      true,
    );

    await implementation.deployed();

    console.log(implementation.address);
    

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
