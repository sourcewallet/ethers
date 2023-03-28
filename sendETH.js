import { ethers } from "ethers";
const ALCHEMY_GOERLI_URL = 'https://eth-goerli.alchemyapi.io/v2/API_KEY';
const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);
import 'dotenv/config';

//process.env.wallet1_privatekey
const privateKey = process.env.SIGNER_PRIVATE_KEY
//use privatekey and provider construct wallet_obj
const wallet1 = new ethers.Wallet(privateKey, provider)
//wallet2 receiver address
const wallet2 = process.env.address2;



const main = async () => {
    // get_address
    const address1 = process.env.address1;
    const address2 = process.env.address2;
    console.log(`1. get_address`);
    console.log(`wallet1: ${address1}`);
    console.log(`wallet2: ${address2}`);
   

    
    console.log(`\n2. get_count`);
    const txCount1=await provider.getTransactionCount(wallet1);
    const txCount2 = await provider.getTransactionCount(wallet2)
    console.log(`wallet1_count: ${txCount1}`)
    console.log(`wallet2_count: ${txCount2}`)

    // sendETH
    console.log(`\n3.sendETH`);
    
    console.log(`balance before send`)
    console.log(`wallet1: ${ethers.formatEther(await provider.getBalance(wallet1))} ETH`)
    console.log(`wallet2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
    
    const tx = {
        to: address2,
        value: ethers.parseEther("0.001")
    }

    console.log(`\n4.waiting`)
    const receipt = await wallet1.sendTransaction(tx)
    await receipt.wait()
    //print receipt
    console.log(receipt) 
    
    console.log(`\nbalance after send`)
    console.log(`wallet1: ${ethers.formatEther(await provider.getBalance(wallet1))} ETH`)
    console.log(`wallet2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
}

main()
