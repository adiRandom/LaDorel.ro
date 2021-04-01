

function openItemModal(e) {
    const itemId = e.currentTarget.getAttribute("id");
    const item = dataStore.items.find(item => item.id.toString() === itemId)
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

document.querySelectorAll(".card").forEach(el => el.addEventListener("click", openItemModal))
document.querySelector("#item-modal").addEventListener("click",closeModal)