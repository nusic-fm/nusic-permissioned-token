import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { IdentitySDK } from '@onchain-id/identity-sdk';

async function main() {
    const [owner, add1] = await ethers.getSigners();

    console.log(" api key alchemy = ",process.env.ALCHEMY_KEY);
    
    const provider = ethers.getDefaultProvider('rinkeby', {
        alchemy: process.env.ALCHEMY_KEY
    });
    
    const CLAIM_ISSUER_PRIVATE_KEY = 'issuer_private_key';
    const claimIssuerWallet = new IdentitySDK.Providers.Wallet(CLAIM_ISSUER_PRIVATE_KEY, provider);
    
    const DEPLOY_PRIVATE_KEY = 'deploy_private_key';
    const deployWallet = new IdentitySDK.Providers.Wallet(DEPLOY_PRIVATE_KEY, provider);
    

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
