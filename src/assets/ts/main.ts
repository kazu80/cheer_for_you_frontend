import MetaMaskOnboarding from '@metamask/onboarding'

const forwarderOrigin = 'http://localhost:3000';
const ETHER = 10 ** 18;

const initialize = () => {
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
}

window.addEventListener("DOMContentLoaded", initialize);