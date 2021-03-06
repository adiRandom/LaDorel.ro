// TODO: Fetching initial cart not working
function addItemToCartAPI(item) {
    fetch("/api/cart", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
}

function removeItemFromCartAPI(itemId) {
    fetch("/api/cart", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId }),
    });
}

function clearCartAPI() {
    fetch("/api/cart", {
        method: "POST",
    });
}

function removeItem(event) {
    //This is a click handler for the remove button. Get the id of the item
    const itemId = Number.parseInt(event.target.getAttribute("data-id"));

    //Remove it from the data store and from the DOM
    document.querySelector(`#cart-item-${itemId}`).remove();
    dataStore.cart = dataStore.cart.filter((item) => item.id !== itemId);

    removeItemFromCartAPI(itemId);

    //Save the cart to localStorage as well
    localStorage.setItem("cart", JSON.stringify(dataStore.cart));
}

function buy() {
    //Clear the cart
    const list = document.querySelector(".cart-list");
    document
        .querySelectorAll(".cart-item")
        .forEach((el) => list.removeChild(el));

    alert("Comanda plasata!");
    clearCartAPI();

    //Clear the cart from the localStorage
    localStorage.removeItem("cart")
}

function addToCart(event) {
    //If the user is not logged in, redirect them to the logi  page
    function getCookie(val) {
        const name = val + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(";");
        for (const cookie of cookies) {
            const trimmedCookie = cookie.trim();
            if (trimmedCookie.indexOf(name) == 0) {
                return cookie.substring(name.length + 1, trimmedCookie.length);
            }
        }
        return "";
    }
    if (getCookie("session") === "") {
        window.location.replace("/auth");
        return;
    }
    //Get the item
    const itemId = Number.parseInt(event.currentTarget.getAttribute("data-id"));
    const item = dataStore.items.find((val) => val.id === itemId);

    //Add item to the DOM

    const itemNode = document.createElement("li");
    itemNode.classList.add("cart-item");
    itemNode.id = `cart-item-${item.id}`;

    const itemImage = document.createElement("img");
    itemImage.src = item.thumbnailUrl;
    itemImage.className = "cart-item-image";
    itemImage.alt = "item-thumbnail";

    const itemRemove = document.createElement("img");
    itemRemove.src = "/img/remove.svg";
    itemRemove.setAttribute("data-id", item.id);
    itemRemove.className = "cart-item-remove";
    itemRemove.alt = "remove-button";
    itemRemove.addEventListener("click", removeItem);

    const itemInfoBox = document.createElement("div");
    itemInfoBox.className = "cart-item-info";

    const itemName = document.createElement("h5");
    itemName.className = "cart-item-name";
    itemName.innerText =
        item.name.toString() > 36
            ? item.name.toString().substring(0, 33) + "..."
            : item.name.toString();

    const itemPrice = document.createElement("h6");
    itemPrice.className = "cart-item-price";
    itemPrice.innerText = `${item.price} lei`;

    itemInfoBox.appendChild(itemName);
    itemInfoBox.appendChild(itemPrice);

    itemNode.appendChild(itemRemove);
    itemNode.appendChild(itemImage);
    itemNode.appendChild(itemInfoBox);

    document.querySelector(".cart-list").appendChild(itemNode);

    addItemToCartAPI(item);

    //Save the cart to localStorage as well
    localStorage.setItem("cart", JSON.stringify(dataStore.cart));
}

//Bind event listeners

document.querySelector("#buy-button")?.addEventListener("click", buy);
document
    .querySelectorAll(".cart-item-remove")
    .forEach((el) => el.addEventListener("click", removeItem));

//Bind to the item modal
document.querySelector("#item-modal-add").addEventListener("click", addToCart);
