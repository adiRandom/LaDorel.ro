export default interface User {
    email: string,
    hash: string,
    salt: string,
    token: string,
    id: string
}