
const cartStore = {}

export function addItemToCart(userId, item) {
    if (cartStore[userId]) {
        cartStore[userId].push(item);
    } else {
        cartStore[userId] = [item];
    }
}

export function removeItemFromCart(userId, itemId) {
    if (!cartStore[userId])
        return;
    cartStore[userId] = cartStore[userId].filter(item => item.id !== itemId)
}


export function getCart(userId) {
    if (!userId)
        return [];
    return cartStore[userId] ?? [];
}