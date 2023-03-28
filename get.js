import { ethers } from "ethers";


//const provider_alchemy = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/3ZVuPHE7aaKrh-5zPRCVtwwphpHj7fpb')//instead of your api_key
const providerGoerli = new ethers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/API_KEY')


const main = async () => {
    console.log("1. getbalance on mainnet and Goerli");
    
    //const balance = await provider_alchemy.getBalance(`vitalik.eth`);
    const balanceGoerli = await providerGoerli.getBalance(`vitalik.eth`);
    
    //console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balanceGoerli)} ETH`);
    
    

    console.log("\n2. get blockNumber")
    const blockNumber = await providerGoerli.getBlockNumber();
    console.log(blockNumber);

   
    // Get the best guess at the recommended
    console.log("\n3. Get the best guess at the recommended")
    const feeData = await providerGoerli.getFeeData();
    console.log(feeData);

    
    console.log("\n4. get block")
    const block = await providerGoerli.getBlock(0);
    console.log(block);

   

}

main()