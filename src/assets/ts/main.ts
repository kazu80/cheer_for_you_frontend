import {initialize} from "./metamask";
import {initializeDevProtocol} from "./authors";

window.addEventListener("DOMContentLoaded", async () => {
    initialize();
    initializeDevProtocol();
});