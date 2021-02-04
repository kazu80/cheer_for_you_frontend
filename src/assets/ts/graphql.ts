const ENDPOINT = "https://api.devprtcl.com/v1/graphql";

export const property_meta = async (query) => {
    const response = await fetch(ENDPOINT, fetchOptions(query));
    const json = await response.json();

    return json.data.property_meta;
};

const fetchOptions = (query): RequestInit => {
    return  {
        method: "POST",
        headers: {
            "X-Requested-With": "xhr",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
        }),
    };
};