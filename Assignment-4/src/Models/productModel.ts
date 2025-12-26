import mongoose from 'mongoose';
import { ProductTypes } from '../Types/productType';

const ProductSchema = new mongoose.Schema<ProductTypes>(
    {
        title: {type: String, required: true },
        description: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        catagory: {type: String, required: true}
    },{
        timestamps: true
    }
)

export default mongoose.model<ProductTypes>("Products",ProductSchema);