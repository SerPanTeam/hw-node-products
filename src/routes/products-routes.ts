import { Router } from "express";
import { addNewProduct, getAllProducts, getProductById } from "../controllers/product-controller";

export const productsRoutes = Router();

productsRoutes.post("/", addNewProduct);
productsRoutes.get("/", getAllProducts);
productsRoutes.get("/:id", getProductById);