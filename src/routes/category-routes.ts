import { Router } from "express";
import { addCategory, getAllCategories } from "../controllers/category-controller";

export const categoryRoutes = Router();

categoryRoutes.post("/", addCategory);
categoryRoutes.get("/", getAllCategories);
