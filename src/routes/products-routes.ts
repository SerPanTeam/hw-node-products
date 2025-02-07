import { Router } from "express";
import { addNewProduct, getAllProducts, getProductById, delProductById, updateProduct } from "../controllers/product-controller";

export const productsRoutes = Router();

productsRoutes.post("/", addNewProduct);
productsRoutes.get("/", getAllProducts);
productsRoutes.get("/:id", getProductById);
productsRoutes.delete("/:id", delProductById);
productsRoutes.put("/:id", updateProduct);