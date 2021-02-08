import {getWalletAddress, initialize} from "./metamask";
import {initializeDevProtocol} from "./authors";
import {getDevAmount, getDevAmountByDevKit, stakeDev} from "./dev_protocol";
import {getAddress} from "@ethersproject/address";

window.addEventListener("DOMContentLoaded", async () => {
    initialize();
    initializeDevProtocol();

    // Todo Ropstenに向けてStakingしたい Ropstenのプロパティアドレスを取得できない
    // await stakeDev('xxxxxx', '0.0001')
});