import {Document} from 'mongoose';

export interface ProductTypes extends Document {
    title: string,
    description: string,
    price: number,
    quantity: number,
    catagory: string
}