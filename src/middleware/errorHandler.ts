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
