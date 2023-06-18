// models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export { Item, itemSchema };