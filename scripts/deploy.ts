import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { IdentitySDK } from '@onchain-id/identity-sdk';

async function main() {
    const [owner, add1] = await ethers.getSigners();

    console.log(" api key alchemy = ",process.env.ALCHEMY_KEY);
    
    const provider = ethers.getDefaultProvider('rinkeby', {
        alchemy: process.env.ALCHEMY_KEY
    });
    
   console.log(" provider = ", ethers.provider);
   console.log(" provider = ", ethers.providers);

    // instantiate an Identity from its address on a specific network.
    const identity = await IdentitySDK.Identity.at('0xadD92F8Ef0729E969c5a98Ea5740c9b644B362e3', { provider });
    
    //const claimsIdsByTopic = await identity.getClaimIdsByTopic(1);
    //const claimssByTopic = await identity.getClaimsByTopic(1);

    console.log("testing provider = ",provider);
    console.log("testing identity = ",identity);

    //console.log("claimsIdsByTopic = ", claimsIdsByTopic);
    //console.log("claimssByTopic = ", claimssByTopic);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
