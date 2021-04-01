function getHomeItemsInitial() {
    //Get all the item cards rendered by the server
    fetch("http://localhost:3000/api/unelte").then(res => res.json()).then(items => dataStore.items = items)
//    TODO: Implement pagination
}

// //Get the items when the page loads
// document.querySelector("main").addEventListener("load",getHomeItemsInitial);