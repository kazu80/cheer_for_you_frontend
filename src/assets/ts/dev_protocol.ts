import {AbiItem} from "web3-utils";
import {getEndpoint} from "./metamask";
import Web3 from "web3";
import {addresses, contractFactory} from "@devprotocol/dev-kit";
import {BigNumber} from "@ethersproject/bignumber";

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

let client = null;
async function getClient() {
    if (client === null) {
        const { ethereum } = window;
        const provider     = new Web3(ethereum)
        client = contractFactory(provider.currentProvider)
    }

    return client;
}

/**
 * 所持DEV数を取得する
 * @param walletAddress
 */
export const getDevAmountByDevKit = async (walletAddress) => {
    const clientDev = await getClient();

    // Todo more detail
    const registryContract = clientDev.registry(addresses.eth.ropsten.registry)
    const address = await registryContract.token()

    const amount  = BigNumber.from(await clientDev.dev(address).balanceOf(walletAddress))

    return amount.div("1000000000000000000").toString();
}

export const stakeDev = async (propertyAddress: string, amount: string) => {
    const clientDev = await getClient();

    const registryContract = clientDev.registry(addresses.eth.ropsten.registry)
    const address = await registryContract.token()

    // TODO https://github.com/dev-protocol/dev-kit-js/blob/main/lib/dev/index.ts
    return clientDev.dev(address).deposit(propertyAddress, amount)
}