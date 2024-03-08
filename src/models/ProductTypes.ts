export type ProductIn = {
    name: string,
    stock: number,
    categoryId: number,
    price: number,
    description: string,
    imgUrl: string,
    userId: number
}

export type ProductOut = {
    id: number,
    name: string,
    stock: number,
    categoryId: number,
    price: number,
    description: string,
    imgUrl: string,
    userId: number
}