import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import Logger from './Middlewares/Logger';

import userRoutes from './Routes/userRoutes';
import productRoutes from './Routes/productRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json(),Logger);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


