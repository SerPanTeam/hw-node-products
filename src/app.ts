import "dotenv/config";
import connectDB from "./db";
import errorHandler from "./middleware/errorHandler";
const PORT = process.env.PORT || 3333;
import { productsRoutes } from "./routes/products-routes";
import { categoryRoutes } from "./routes/category-routes";

import express from "express";
const app = express();
app.use(express.json());
app.use("/products", productsRoutes);
app.use("/categories", categoryRoutes);

app.use(errorHandler);



app.get("/", (req, res) => {
    res.status(200).json({ message: "Home page." });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

connectDB();