import Product from "../models/Product";
import { Request, RequestHandler, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(200).json(products);
}

export const addNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, description } = req.body;
        if (!name || !price || !description) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const newProduct = new Product({ name, price, description });
        await newProduct.save();
        res.status(201).json(newProduct);

    } catch (error) {
        console.log("Error with added new product!", error);
        // res.status(500).json({ message: "Error with added new product!" });
        // return;
        next(error);
    }
}

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
