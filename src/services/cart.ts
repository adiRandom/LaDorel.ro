import {Item} from "../models/Item";

const cartStore: { [userId: string]: Item[] } = {}

export function addItemToCart(userId: string, item: Item) {
    if (cartStore[userId]) {
        cartStore[userId].push(item);
    } else {
        cartStore[userId] = [item];
    }
}

export function removeItemFromCart(userId: string, itemId: number) {
    if (!cartStore[userId])
        return;
    cartStore[userId] = cartStore[userId].filter(item => item.id !== itemId)
}


export function getCart(userId?: string): Item[] {
    if (!userId)
        return [];
    return cartStore[userId] ?? [];
}