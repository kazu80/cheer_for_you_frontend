import {getPropertiesElement, getStakingElement, profile} from "./profile";
import {allAuthor, propertiesAuthor} from "./queries";
import {property_meta} from "./graphql";
import {getWalletAddress} from "./metamask";
import {getDevAmountByDevKit} from "./dev_protocol";

const ENDPOINT = "https://dev-for-apps.azureedge.net/accounts?"

export const initializeDevProtocol = async () => {
    const getAccountsButton   = document.getElementById('getAccount') as HTMLButtonElement;
    const getDevBalanceResult = document.getElementById("getDevBalanceResult");
    const getAuthorsButton    = document.getElementById("getAuthors") as HTMLButtonElement;

    // 所持DEV数を取得する
    getAccountsButton.addEventListener('click', async () => {
        getDevBalanceResult.innerText = await getDevAmountByDevKit(await getWalletAddress()) + 'DEV'
    })

    // Author一覧を取得する
    getAuthorsButton.addEventListener('click', getAuthors);
};

const getAuthorInfo = async (address) => {
    const query_params = new URLSearchParams({
        address: address,
    });

    const response = await fetch(ENDPOINT + query_params, {
        method: "GET"
    });

    const info = await response.json();

    if (!Array.isArray(info)) throw new Error('not array');

    return info[0];
}

const getAuthorInfoElement = async (authorAddress) : Promise<HTMLDivElement> => {
    const authorInfo = await getAuthorInfo(authorAddress);
    return profile(
        authorInfo.portrait.url,
        authorInfo.name,
        authorInfo.biography
    );
}

const getAuthors = async () => {
    const profiles = document.getElementById("profiles");

    for ( const meta of await property_meta(allAuthor())) {
        try {
            const authorAddress = meta.author;

            // AuthorのカードElementを追加
            const authorInfoElement = await getAuthorInfoElement(authorAddress);

            // このAuthorのプロパティを取得
            const properties        = await property_meta(propertiesAuthor(authorAddress));
            const propertiesElement = await getPropertiesElement(properties);

            // ステーキングフォームの追加
            const stakingElement = await getStakingElement(authorAddress, properties.length);

            profiles.appendChild(authorInfoElement);
            authorInfoElement.appendChild(stakingElement);
            authorInfoElement.appendChild(propertiesElement);
        } catch (e) {
            // console.error(meta);
        }
    }
}