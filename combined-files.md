# Структура проекта

```plaintext
├── src
│   ├── controllers
│   │   └── product-controller.ts
│   ├── db
│   │   └── index.ts
│   ├── middleware
│   │   └── errorHandler.ts
│   ├── models
│   │   └── Product.ts
│   ├── routes
│   │   └── products-routes.ts
│   └── app.ts
├── .env
├── .gitignore
├── codewr.js
├── combined-files.md
├── package-lock.json
├── package.json
└── tsconfig.json

```

# Файлы .ts, .tsx, .css

## src\app.ts

```typescript
import errorHandler from "./middleware/errorHandler";
import "dotenv/config";
const PORT = process.env.PORT || 3333;
import { productsRoutes } from "./routes/products-routes";
import express from "express";
const app = express();
app.use(errorHandler);
app.use(express.json());
app.use("/products", productsRoutes);


import connectDB from "./db";

app.get("/", (req, res) => {
    res.status(200).json({ message: "Home page." });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

connectDB();
```

## src\controllers\product-controller.ts

```typescript
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

```

## src\db\index.ts

```typescript
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file!");
    process.exit(1);
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log("Connection to DB successful!", conn.connection.host);
    } catch (error) {
        console.log("Error connection to DB!", error);
        process.exit(1);

    }
}

export default connectDB;
```

## src\middleware\errorHandler.ts

```typescript
import { Request, Response, NextFunction } from "express";

// ✅ Исправленный middleware ошибок (неявно `void`)
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("🔥 Error:", err.message);

    // ✅ Если ошибка парсинга JSON → 400 Bad Request
    if (err.type === "entity.parse.failed") {
        res.status(400).json({ message: "Invalid JSON format" });
        return;
    }

    // ✅ Проверяем, есть ли у ошибки статус, иначе 500
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        message: err.message || "Something went wrong!",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack
    });

    // ✅ Никакого `return` → TypeScript теперь не ругается
};

export default errorHandler;

```

## src\models\Product.ts

```typescript
import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
}, {
    timestamps: true
})

export default mongoose.model("Product", ProductSchema);
```

## src\routes\products-routes.ts

```typescript
import { Router } from "express";
import { addNewProduct, getAllProducts, getProductById } from "../controllers/product-controller";

export const productsRoutes = Router();

productsRoutes.post("/", addNewProduct);
productsRoutes.get("/", getAllProducts);
productsRoutes.get("/:id", getProductById);
```

# Дополнительные файлы

⚠️ Файл **index.html** не найден и пропущен.

