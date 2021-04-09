function openItemModal(e) {
    const itemId = e.currentTarget.getAttribute("id");
    const item = dataStore.items.find(item => item.id.toString() === itemId)
    //Insert the item data into the modal
    document.querySelector("#item-modal-title").innerHTML = item.name;
    document.querySelector("#item-modal-image").setAttribute("src", item.image);
    document.querySelector("#item-modal-description").innerHTML = item.description;
    //Create the spec table

    //Remove the prev elements in the table
    document.querySelector("#item-modal-specs").innerHTML = ""


    for (const [key, spec] of item.techSpecs) {
        const row = document.createElement("tr");
        row.className = "item-modal-spec"
        const rowKey = document.createElement("td");
        const rowSpec = document.createElement("td");
        rowSpec.className = "item-modal-spec-value"
        const rowKeyParagraph = document.createElement("h5")
        const rowSpecParagraph = document.createElement("p")
        rowSpecParagraph.className = "item-modal-spec-text-value";
        rowKeyParagraph.className = "item-modal-spec-text-key";
        rowKeyParagraph.innerHTML = key;
        rowSpecParagraph.innerHTML = spec;
        rowKey.appendChild(rowKeyParagraph);
        rowSpec.appendChild(rowSpecParagraph);
        row.appendChild(rowKey);
        row.appendChild(rowSpec);
        document.querySelector("#item-modal-specs").appendChild(row)
    }
    document.querySelector("#item-modal-price").innerHTML = `${item.price} lei`

//    Add the id of the item to the buy button

    document.querySelector("#item-modal-add").setAttribute("data-id", itemId)

//    Make the modal visible
    document.querySelector("#item-modal").style.display = "flex";
}

function closeModal(e) {
    //Check for bubbling
    if (e.target === e.currentTarget)
        document.querySelector("#item-modal").style.display = "none"
}

document.querySelectorAll(".card").forEach(el => el.addEventListener("click", openItemModal))
document.querySelector("#item-modal").addEventListener("click", closeModal)
document.querySelector("#item-modal-add").addEventListener("click", closeModal)