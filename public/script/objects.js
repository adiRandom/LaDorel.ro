const dataStore = {
    items: [],
    filter: {
        minPrice: 0,
        maxPrice: 0
    }
}

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


function openItemModal(e) {
    const itemId = e.currentTarget.getAttribute("id");
    const item = dataStore.items.find(item => item.id.toString() === itemId)
    console.log(item)
    //Insert the item data into the modal
    document.querySelector("#item-modal-title").innerHTML = item.name;
    document.querySelector("#item-modal-image").setAttribute("src", item.image);
    document.querySelector("#item-modal-description").innerHTML = item.description;
    for (const [key, spec] of item.techSpecs) {
        const row = document.createElement("tr");
        const rowKey = document.createElement("td");
        const rowSpec = document.createElement("td");
        rowKey.innerHTML = key;
        rowSpec.innerHTML = spec;
        row.appendChild(rowKey);
        row.appendChild(rowSpec);
        document.querySelector("#item-modal-specs").appendChild(row)
    }
    document.querySelector("#item-modal-price").innerHTML = `${item.price} lei`

//    Make the modal visible
    document.querySelector("#item-modal").style.display = "flex";
}

function closeModal(e){
    //Check for bubbling
    if(e.target === e.currentTarget)
        document.querySelector("#item-modal").style.display = "none"
}

//Register the events listeners

document.querySelector("#price-range-min").addEventListener("change", onMinPriceFilterChange)
document.querySelector("#price-range-max").addEventListener("change", onMaxPriceFilterChange)
document.querySelector("#filter-submit").addEventListener("click", applyFilters)
document.querySelectorAll(".card").forEach(el => el.addEventListener("click", openItemModal))
document.querySelector("#item-modal").addEventListener("click",closeModal)