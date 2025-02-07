import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";

// Создание новой категории
export const addCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: "Category name is required" });
            return;
        }

        const newCategory = new Category({ name });
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
};

// Получение всех категорий
export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};
