import mongoose from "mongoose";
import { productType } from "../types/productType";

const productModel = new mongoose.Schema<productType>(
    {
        title: { type: String },
        description: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        inStock: { type: Boolean },
        catagory: { type: [String] },
        tags: { type: [String] },
        deletedAt: {type: Date,default: null}
    },
    {
        timestamps: true
    }
)

export default mongoose.model<productType>("products", productModel);