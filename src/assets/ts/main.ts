import {getWalletAddress, initialize} from "./metamask";
import {initializeDevProtocol} from "./authors";
import {getDevAmount, getDevAmountByDevKit} from "./dev_protocol";
import {getAddress} from "@ethersproject/address";

window.addEventListener("DOMContentLoaded", async () => {
    initialize();
    initializeDevProtocol();

    const address = await getWalletAddress();
    console.log("web3",  await getDevAmount(address));
    console.log("devkit", await getDevAmountByDevKit(address));
});