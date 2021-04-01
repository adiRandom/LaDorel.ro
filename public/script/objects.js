
function getItemsInitial() {
    //Get all the item cards rendered by the server
    fetch("http://localhost:3000/api/unelte").then(res => res.json()).then(items => dataStore.items = items)
//    TODO: Implement pagination
}

function renderItemsInFeed(items) {
    const page = document.querySelector("#item-page");
    //Delete the items currently in this page and add the new items
    page.childNodes.forEach(el => page.removeChild(el))
    items.forEach(item => page.appendChild(item))
}


function applyFilters() {
    const items = dataStore.items.filter(item => {
        //Get the items that are in the price range
        const price = item.price
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

document.querySelector("#price-range-min").addEventListener("change", onMinPriceFilterChange)
document.querySelector("#price-range-max").addEventListener("change", onMaxPriceFilterChange)
document.querySelector("#filter-submit").addEventListener("click", applyFilters)
