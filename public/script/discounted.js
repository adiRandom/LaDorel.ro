function getItemsInitial() {
    //Get all the item cards rendered by the server
    fetch("http://localhost:3000/api/oferte").then(res => res.json()).then(items => dataStore.items = items)
    //Also get the nodes
    document.querySelectorAll(".card").forEach(el => dataStore.itemNodes.push(el))
}

function getRandomInt(min, max) {
    const intMin = Math.ceil(min);
    const intMax = Math.floor(max);
    return Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
}

function changeHue(e) {
    const element = e.target;
    element.style.filter = `hue-rotate(${getRandomInt(0, 360)}deg)`
}

document.getElementsByTagName("h1").item(0).addEventListener("mouseover", changeHue)