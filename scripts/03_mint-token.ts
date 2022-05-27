import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { IdentitySDK } from '@onchain-id/identity-sdk';
import { ClaimTopicsRegistry, ClaimTopicsRegistry__factory, DefaultCompliance, DefaultCompliance__factory, IdentityRegistry, IdentityRegistryStorage, IdentityRegistryStorage__factory, IdentityRegistry__factory, Token, Token__factory, TrustedIssuersRegistry, TrustedIssuersRegistry__factory } from '../typechain';

async function main() {
    const [owner, add1] = await ethers.getSigners();

    const Token:Token__factory = await ethers.getContractFactory("Token");
    const token:Token = await Token.attach("0xcDB8942c029E850da5CD4802bf5fC71395C46085")

    console.log("Token deployed to:", token.address);

    const txt1 = await token.mint(owner.address,2);
    console.log("Token mint transaction hash = ",txt1.hash);
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
