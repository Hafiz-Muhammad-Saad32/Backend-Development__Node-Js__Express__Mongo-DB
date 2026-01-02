import { Router } from "express";
import { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById} from "../controllers/products";

const route = Router()

route.post("/create", createProduct);
route.get("/getAll", getAllProducts);
route.get("/getById/:id", getProductById);
route.patch("/update/:id", updateProductById);
route.delete("/delete/:id", deleteProductById);

export default route;

