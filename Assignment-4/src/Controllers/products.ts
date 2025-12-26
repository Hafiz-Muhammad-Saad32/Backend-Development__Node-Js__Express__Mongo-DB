import {Request, Response} from 'express';
import userModel from '../Models/productModel'

interface reqBody {
    title: string,
    description: string,
    price: number,
    quantity: number,
    catagory: string
}

interface payload {
    title?: string,
    description?: string,
    price?: number,
    quantity?: number,
    catagory?: string
}


export const createProduct = async (req: Request<{}, {}, reqBody>, res: Response) => {
    try {
        const { title, description, price, quantity, catagory } = req.body;

        if (!title || !description || !price || !quantity || !catagory) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }

        const user = new userModel(req.body);
        const newProduct = await user.save();

        res.status(201).json({
            success: true,
            message: "product created successfully",
            data: newProduct
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}

export const getAllProducts = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const products = await userModel.find();

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "no products found"
            })
        }

        res.status(200).json({
            success: true,
            message: "products fetched successfully",
            data: products
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await userModel.findById({ _id: id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "product fetched successfully",
            data: product
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}

// Update Product by ID for patch request
export const updateProductById = async (req: Request<{ id: string }, {}, any>, res: Response) => {
    try {
        const isProductExist = await userModel.findOne({ _id: req.params.id });
        if (!isProductExist) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        const payload: any = req.body;

        const updatedProduct = await userModel.findByIdAndUpdate({ _id: req.params.id }, payload, {
        new:true, runValidators: true});

       res.status(200).json({
        success: true,
        message: "product updated successfully",
        data: updatedProduct
       }) 

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}

export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const isProductExist = await userModel.findById({ _id: id });

        if (!isProductExist) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        const deletedProduct = await userModel.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "product deleted successfully",
            data: deletedProduct
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error" + err
        })
    }
}