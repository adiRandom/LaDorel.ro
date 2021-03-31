//TODO: Add categories

export type Item = {
    id: number,
    name: string,
    thumbnailUrl: string,
    image: string,
    description: string,
    rating: number,
    price: number,
    techSpecs: [string,string][]
}