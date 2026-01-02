import {Document} from "mongoose";

export interface productType extends Document{
    title: string,
    description: string,
    price: number,
    quantity: number,
    inStock: boolean,
    catagory: string[],
    tags: string[],
    deletedAt: {}
}