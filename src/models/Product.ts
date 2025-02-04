import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
}, {
    timestamps: true
})

export default mongoose.model("Product", ProductSchema);