import {getPropertiesElement, profile} from "./profile";
import {allAuthor, propertiesAuthor} from "./queries";
import {property_meta} from "./graphql";

const ENDPOINT = "https://dev-for-apps.azureedge.net/accounts?"

export const initializeDevProtocol = () => {
    const getAuthorsButton = document.getElementById("getAuthors") as HTMLButtonElement;
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
            profiles.appendChild(authorInfoElement);

            // このAuthorのプロパティを取得
            const properties        = await property_meta(propertiesAuthor(authorAddress));
            const propertiesElement = await getPropertiesElement(properties);
            authorInfoElement.appendChild(propertiesElement);
        } catch (e) {
            console.error(meta);
        }
    }
}