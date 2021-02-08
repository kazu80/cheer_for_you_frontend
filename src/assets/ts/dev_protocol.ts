import {AbiItem} from "web3-utils";
import {getEndpoint} from "./metamask";
import Web3 from "web3";
import {contractFactory} from "@devprotocol/dev-kit";

/**
 * 所持DEV数を取得する: Web3
 * @param walletAddress
 */
export const getDevAmount = async (walletAddress: string) => {
    const abi: AbiItem[] = [
        {
            constant: true,
            inputs: [{ name: '_owner', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ name: 'balance', type: 'uint256' }],
            stateMutability: 'view',
            payable: false,
            type: 'function'
        },
        {
            constant: true,
            inputs: [],
            name: 'decimals',
            outputs: [{ name: '', type: 'uint8' }],
            stateMutability: 'view',
            payable: false,
            type: 'function'
        }
    ]
    const endpoint = await getEndpoint()

    const web3 = new Web3(endpoint)
    if (web3) {
        const contract = new web3.eth.Contract(abi, '0x5caf454ba92e6f2c929df14667ee360ed9fd5b26')
        const balance = await contract.methods.balanceOf(walletAddress).call()
        return balance;
    }

    return 0
}

/**
 * 所持DEV数を取得する
 * @param walletAddress
 */
export const getDevAmountByDevKit = async (walletAddress) => {
    const endpoint  = await getEndpoint();
    const provider  = new Web3.providers.HttpProvider(endpoint)
    const client    = contractFactory(provider)
    const devAmount = await client.dev('0x5caf454ba92e6f2c929df14667ee360ed9fd5b26').balanceOf(walletAddress)

    return devAmount;
}
