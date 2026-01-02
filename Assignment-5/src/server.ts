import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import logger from "./middleware/logger";
import productRoutes from "./routes/productRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/products", productRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})