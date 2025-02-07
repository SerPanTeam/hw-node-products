import Product from "../models/Product";
import { Request, RequestHandler, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find().populate("category"); // Добавляем категории
    res.status(200).json(products);
};


import Category from "../models/Category";

export const addNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, description, category } = req.body;

        if (!name || !price || !description || !category) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        // Проверяем, существует ли такая категория
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            res.status(400).json({ message: "Invalid category ID" });
            return;
        }

        const newProduct = new Product({ name, price, description, category });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};


export const getProductById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Wrong ID" });
            return;
        }

        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found!" })
            return;
        }
        res.status(200).json(product)
    }

    catch (error) {
        console.log(error);
        // res.status(500).json({ message: "Error with show product!" });
        next(error);
    }
}

// delProductById

export const delProductById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Wrong ID" });
            return;
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }


        res.status(200).json({ message: `Product ID:${id} deleted successfully` })
    }

    catch (error) {
        console.log(error);
        next(error);
    }
}

export const updateProduct: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid product ID" });
            return;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });
        // const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description });

        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};
