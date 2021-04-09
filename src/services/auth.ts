import User from "../models/User";
import {createHash} from "crypto";

const userStore: User[] = []

function getRandomString(len: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function hash(val: string, salt: string): string {
    const hash = createHash("sha256");
    hash.update(val);
    hash.update(salt);
    return hash.digest().toString()
}

export default function authenticate(email: string, password: string): string {
    const userFound = userStore.find(user => user.email === email)
    if (!userFound) {
        //No user found, create a new one
        const salt = getRandomString(32);
        const token = getRandomString(32);
        const _hash = hash(password, salt);
        const user: User = {
            email,
            hash: _hash,
            salt,
            token,
            id: getRandomString(32)
        }
        userStore.push(user)
        return token;
    } else {
        const _hash = hash(password, userFound.salt);
        if (_hash === userFound.hash)
            return userFound.token;
        else
            return ""
    }
}

export function getUser(token: string): User | undefined {
    return userStore.find(user => user.token === token)
}