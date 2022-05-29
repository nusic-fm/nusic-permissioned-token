import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { IdentitySDK } from '@onchain-id/identity-sdk';
import { NFTToken, NFTToken__factory } from '../typechain';

async function main() {
    const [owner, add1] = await ethers.getSigners();

    const NFTToken:NFTToken__factory = await ethers.getContractFactory("NFTToken");
    const token:NFTToken = await NFTToken.attach("0x2Ed9B43a7318e2F059fFcc6e19Fe892185BA19F3")

    console.log("Token deployed to:", token.address);

    const txt1 = await token.setBaseURI("https://bafkreigmxakqzongdk5knqgeslexzvtgs3g7zdvf7xdtsvoulkcytsatee.ipfs.nftstorage.link/");
    console.log("Token set url transaction hash = ",txt1.hash);
    const receipt = await txt1.wait();
    //console.log("Token mint receipt = ",receipt);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
