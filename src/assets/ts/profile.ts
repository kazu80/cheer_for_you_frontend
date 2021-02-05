import {staking} from "./staking";

export const profile = (image, name, biography): HTMLDivElement => {
    const card = document.createElement('div');
    card.classList.add("col-sm-4");

    const flex = document.createElement('div');
    flex.classList.add("d-flex");

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("image", "p-2");

    const img = document.createElement('img');
    img.classList.add("rounded");
    img.setAttribute('src', image);
    img.style.width = "100%";

    const prof = document.createElement("div");
    prof.classList.add("p-2");

    const nameWrapper = document.createElement("h4");
    nameWrapper.classList.add("mb-0", "mt-0");
    nameWrapper.innerText = name;

    const biographyWrapper = document.createElement("p");
    biographyWrapper.classList.add("p-1", "article");
    biographyWrapper.innerText = biography;

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add("button","mt-2","d-flex","flex-row","align-items-center");

    const button1 = document.createElement('button');
    button1.classList.add("btn","btn-sm","btn-outline-primary","w-100");
    button1.innerText = "Chat"

    const button2 = document.createElement('button');
    button2.classList.add("btn","btn-sm","btn-primary","w-100","ml-2");
    button2.innerText = "Follow"

    card.appendChild(flex);

    flex.appendChild(imageWrapper);
    flex.appendChild(prof);

    imageWrapper.appendChild(img);

    prof.appendChild(nameWrapper);
    prof.appendChild(biographyWrapper);
    // prof.appendChild(buttonWrapper);

    buttonWrapper.appendChild(button1);
    buttonWrapper.appendChild(button2);

    return card;
};

export const getStakingElement = async (address, total) : Promise<HTMLDivElement> => {
    const inputGroup = document.createElement('div');
    inputGroup.classList.add("input-group", "mb-2", );

    const inputElement = document.createElement('input');
    inputElement.classList.add("form-control");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("placeholder", "0.00");
    inputElement.setAttribute("name", "amount");

    const addressElement = document.createElement('input');
    addressElement.setAttribute("type", "hidden");
    addressElement.setAttribute("name", "address");
    addressElement.setAttribute("value", address);

    const totalElement = document.createElement('input');
    totalElement.setAttribute("type", "hidden");
    totalElement.setAttribute("name", "total");
    totalElement.setAttribute("value", total);

    const stakingButton = document.createElement('button');
    stakingButton.classList.add("btn", "btn-success", "btn-staking");
    stakingButton.setAttribute("type", "button");
    stakingButton.innerText = "DEV"

    stakingButton.addEventListener("click", staking);

    inputGroup.appendChild(addressElement);
    inputGroup.appendChild(totalElement);
    inputGroup.appendChild(inputElement);
    inputGroup.appendChild(stakingButton);

    return inputGroup;
}

export const getPropertiesElement = async (properties): Promise<HTMLUListElement> => {
    const listWrapper = document.createElement('ul');
    listWrapper.classList.add("list-group");

    const listHeader = document.createElement('li');
    listHeader.classList.add("list-group-item","active");
    listHeader.setAttribute("aria-current", "true");
    listHeader.innerText = `properties(${properties.length})`;
    listWrapper.appendChild(listHeader);

    let i = 0;
    for ( const property of properties) {
        if (i > 2) break;

        const list = document.createElement('li');
        list.classList.add("list-group-item");
        list.innerText = property.name;

        listWrapper.appendChild(list);

        i++;
    }

    return listWrapper;
}