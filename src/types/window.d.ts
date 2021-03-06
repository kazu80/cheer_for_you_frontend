import { HttpProvider } from 'web3-core'

export interface Ethereum extends HttpProvider {
    enable: () => Promise<void>
    selectedAddress: string | null
    isConnected: () => boolean
    request: (any) => any
    isMetaMask: () => boolean
    on: any
    currentProvider: (any) => any
}

declare global {
    interface Window {
        ethereum?: Ethereum
    }
}
