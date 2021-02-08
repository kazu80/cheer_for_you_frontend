import MetaMaskOnboarding from '@metamask/onboarding'

const forwarderOrigin = 'http://localhost:3000';
const ETHER = 10 ** 18;

export const initialize = () => {
    const onboardButton     = document.getElementById('connectButton') as HTMLButtonElement;
    const getAccountsButton = document.getElementById('getAccount') as HTMLButtonElement;
    const getAccountsResult = document.getElementById('getAccountsResult');
    const getBalanceResult  = document.getElementById('getBalanceResult');

    getAccountsButton.addEventListener('click', async () => {
        const { ethereum } = window;
        const accounts = await ethereum.request({ method: 'eth_accounts'});

        getAccountsResult.innerText = accounts[0] || 'Not able to get accounts';

        const balance = await ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest']
        });

        const balanceEther = parseInt(balance, 16) / ETHER;

        getBalanceResult.innerText = balanceEther + "ETH";
    })

    const isMetamaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask)
    }

    const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

    const onClickInstall = () => {
        onboardButton.innerText = 'Onboarding in progress';
        onboardButton.disabled  = true;
        onboarding.startOnboarding();
    }

    const onClickConnect = async () => {
        const { ethereum } = window;
        try {
            await ethereum.request({ method: "eth_requestAccounts"});
        } catch (error) {
            console.error(error);
        }
    }

    const MetaMaskClientCheck = () => {
        if (isMetamaskInstalled() === false) {
            onboardButton.innerText = 'Click here to install MetaMask!';
            onboardButton.onclick   = onClickInstall;
            onboardButton.disabled  = false;
        } else {
            onboardButton.innerText = 'Connect';
            onboardButton.onclick   = onClickConnect;
            onboardButton.disabled  = false;
        }
    }

    MetaMaskClientCheck();
    eventObserve();
}

export const eventObserve = () => {
    const { ethereum } = window;

    ethereum.on('chainChanged', chainId => {
        // handle the new network
    })

    ethereum.on('networkChanged', networkId => {
        // handle the new network
    })

    ethereum.on('chainChanged', () => {
        document.location.reload()
    })
}

export const getWalletAddress = async () => {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: 'eth_accounts'});

    if (!Array.isArray(accounts)) throw new Error('accounts is not array')

    return accounts[0];
}

export const getNetworkId = async () => {
    const { ethereum } = window;
    return await ethereum.request({ method: 'net_version'});
}

export const getEndpoint = async () => {
    // TODO RopstenのDEVを取得したい場合のアドレスを知りたい
    const INFURA_ENDPOINT        = 'https://mainnet.infura.io/v3/75ebe953349644b6998136d868f5cd97'
    const WEB3_PROVIDER_ENDPOINT = 'https://devprotocolnode.net/ethereum/mainnet'
    const ROPSTEN_ENDPOINT       = 'https://ropsten.infura.io/v3/0xD6D07f1c048bDF2B3d5d9B6c25eD1FC5348D0A70'

    switch (await getNetworkId()) {
        case "1":
            return WEB3_PROVIDER_ENDPOINT;
        case "3":
            return ROPSTEN_ENDPOINT;
        default:
            return 'http://localhost:8545/';
    }
}