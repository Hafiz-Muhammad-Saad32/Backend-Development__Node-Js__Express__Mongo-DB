import { Request, Response } from "express";
import productModel from "../models/productModel";
import { productSchema, productParam } from "../schemas/productSchema";

export const createProduct = async (req: Request, res: Response) => {

    const { success, error, data } = productSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            success: false,
            error: error.flatten().fieldErrors,
        });
    }

    try {

        const product = await productModel.create(data);

        res.status(200).send({
            messege: "data created successfully",
            data: product
        })

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "internal server error" + err.message,
        });
    }

}

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productModel.find({
            deletedAt: null,
        });;

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products are available"
            })
        }

        res.status(200).json({
            success: true,
            message: "products fetched successfully",
            data: products
        })

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "internal server error" + err.message,
        });
    }
}

export const getProductById = async (req: Request, res: Response) => {

    const { success, data, error } = productParam.safeParse(req.params);

    if (!success) (
        res.status(404).json({
            success: false,
            message: error.flatten().fieldErrors,
        })
    )

    try {

        const product = await productModel.findById({
            _id: data?.id,
            deletedAt: null,
        })

        if (product?.deletedAt != null) {
            return res.status(404).json({
                message: "product has deleted",
            });
        }
        

        if (!product) {
            return res.status(404).json({
                message: "product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "product fetched successfully",
            data: product
        })


    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "internal server error" + err.message,
        });
    }
}


export const updateProductById = async (req: Request, res: Response) => {

    const id = productParam.safeParse(req.params);
    const { success, data, error } = productSchema.partial().safeParse(req.body);

    if (!success) {
        return res.status(400).send({
            success: false,
            message: error.flatten().fieldErrors,
        });
    }

    try {

        const product = await productModel.findByIdAndUpdate(
            id, data,
            {
                new: true,
                runValidators: true
            })

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "Internal server error :" + err.message,
        });
    }
}

export const deleteProductById = async (req: Request, res: Response) => {

    const id = productParam.safeParse(req.params)

    if (!id.success) {
        return res.status(400).json({
            errors: id.error.flatten().fieldErrors,
        });
    }

    try {

        const product = await productModel.findByIdAndUpdate(
            id.data.id,
            { deletedAt: new Date() },
            { new: true }
        )

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.json({
            success: true,
            message: "Product deleted softly",
            data: product
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}