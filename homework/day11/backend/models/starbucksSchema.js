import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
  name: String,
  img: String,
});

export const List = mongoose.model("List", ListSchema);
