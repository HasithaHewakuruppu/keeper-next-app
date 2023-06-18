import mongoose from "mongoose";
import { itemSchema } from "../models/Item"

const listSchema = new mongoose.Schema({
  date: String,
  list:[itemSchema]
});

const List = mongoose.models.List || mongoose.model("List", listSchema);

export {List, listSchema};