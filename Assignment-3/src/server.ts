import express from "express";
import BooksRouter from "./Routes/Books-routes";
import { loggerMiddleware } from "./Middlewares/Log";

const app = express();
const PORT = 3000;

app.use(express.json(), loggerMiddleware);

app.use('/api', BooksRouter );

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})
