const dataStore = {
    items: [],
    filter: {
        minPrice: 0,
        maxPrice: 0
    }
}

function getItemsInitial() {
    //Get all the item cards rendered by the server
    document.querySelectorAll(".card").forEach((value,key,parent)=>dataStore.items.push(value))
//    TODO: Implement pagination
}

function renderItemsInFeed(items) {
    const page = document.querySelector("#item-page");
    //Delete the items currently in this page and add the new items
    page.childNodes.forEach(el => page.removeChild(el))
    items.forEach(item => page.appendChild(item))
}


function applyFilters() {
    const items = dataStore.items.filter(card => {
        //Get the items that are in the price range
        const priceText = card.querySelector(".card-price").textContent;
        const price = Number.parseFloat(priceText.substring(0, priceText.length - 3));
        if (dataStore.filter.minPrice > 0 && price < dataStore.filter.minPrice)
            return false;
        if (dataStore.filter.maxPrice > 0 && price > dataStore.filter.maxPrice)
            return false;
        return true;
    })

    renderItemsInFeed(items);
}

function onMinPriceFilterChange(e) {
    const value = e.target.value;
    if (value < 0) {
        //    TODO: Implement warnings
    } else {
        dataStore.filter.minPrice = Number.parseFloat(value);
    }
}

function onMaxPriceFilterChange(e) {
    const value = e.target.value;
    if (value < 0) {
        //    TODO: Implement warnings
    } else {
        dataStore.filter.maxPrice = Number.parseFloat(value);
    }
}

//Register the events listeners

document.querySelector("#price-range-min").addEventListener("change",onMinPriceFilterChange)
document.querySelector("#price-range-max").addEventListener("change",onMaxPriceFilterChange)
document.querySelector("#filter-submit").addEventListener("click",applyFilters)