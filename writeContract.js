import { ethers } from "ethers";
import 'dotenv/config';
const API_KEY = process.env.API_KEY

const ALCHEMY_GOERLI_URL = `https://eth-goerli.alchemyapi.io/v2/${API_KEY}`
const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

const privateKey = process.env.SIGNER_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider)

const address_to = '0xuefwiefijwieewlfoirjgioerfwejnffwje'//transfer to 


// WETH_ABI
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function transfer(address, uint) public returns (bool)",
    "function withdraw(uint) public ",
];
// WETH_contract（Goerli）
const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'


const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)


const main = async () => {

    const address = await wallet.getAddress()
    
    console.log("\n1. getBalance_WETH")
    const balanceWETH = await contractWETH.balanceOf(address)
    console.log(`getBalance_WETH before transfer: ${ethers.formatEther(balanceWETH)}\n`)
    
    const balanceETH = await provider.getBalance(wallet)
    

    if(ethers.formatEther(balanceETH) > 0.002){

        console.log("\n2. deposit ETH to WETH_contract")
        const tx = await contractWETH.deposit({value: ethers.parseEther("0.001")})
        await tx.wait()
        console.log(`details`)
        console.log(tx)
        const balanceWETH_deposit = await contractWETH.balanceOf(address)
        console.log(`WETH_balance: ${ethers.formatEther(balanceWETH_deposit)}\n`)

        console.log("\n3. transfer to me")
        const tx2 = await contractWETH.transfer(address_to, ethers.parseEther("0.001"))
        await tx2.wait()
        const balanceWETH_transfer = await contractWETH.balanceOf(address)
        console.log(`WETH_balance after transfer: ${ethers.formatEther(balanceWETH_transfer)}\n`)

    }else{
        //if insufficient funds for gas * price + value 
        console.log("insufficient funds")
        
    }
}

main()
