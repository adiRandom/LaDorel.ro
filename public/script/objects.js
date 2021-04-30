function getItemsInitial(page) {
    //Get all the item cards rendered by the server
    fetch(
        `http://localhost:3000/api/${
            page === "unelte de putere" ? "unelte/putere" : page
        }`
    )
        .then((res) => res.json())
        .then((items) => (dataStore.items = items));
    //Also get the nodes
    document
        .querySelectorAll(".card")
        .forEach((el) => dataStore.itemNodes.push(el));
}

function renderItemsInFeed(items) {
    const page = document.querySelector("#item-page");
    //Delete the items currently in this page and add the new items
    page.innerHTML = "";
    items.forEach((item) => page.appendChild(item));
}

function applyFilters() {
    const items = dataStore.items
        .filter((item) => {
            //Get the items that are in the price range
            const price = item.price;
            if (
                dataStore.filter.minPrice > 0 &&
                price < dataStore.filter.minPrice
            )
                return false;
            if (
                dataStore.filter.maxPrice > 0 &&
                price > dataStore.filter.maxPrice
            )
                return false;
            return true;
        })
        .map((item) =>
            dataStore.itemNodes.find((node) => node.id === item.id.toString())
        );

    renderItemsInFeed(items);
}

function onMinPriceFilterChange(e) {
    const value = e.target.value;
    const valueAsNumber = Number.parseFloat(value);
    if (!isNaN(valueAsNumber)) {
        if (valueAsNumber < 0) {
            e.target.value = 0;
        } else {
            dataStore.filter.minPrice = valueAsNumber;
        }
    }
}

function onMaxPriceFilterChange(e) {
    const value = e.target.value;
    const valueAsNumber = Number.parseFloat(value);
    if (!isNaN(valueAsNumber)) {
        if (valueAsNumber < 0) {
            e.target.value = 0;
        } else {
            dataStore.filter.maxPrice = valueAsNumber;
        }
    }
}

//Register the events listeners

document
    .querySelector("#price-range-min")
    .addEventListener("change", onMinPriceFilterChange);
document
    .querySelector("#price-range-max")
    .addEventListener("change", onMaxPriceFilterChange);
document
    .querySelector("#filter-submit")
    .addEventListener("click", applyFilters);
