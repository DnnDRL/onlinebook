import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  authors: [{ type: String }],
  description: String,
  publisher: String,
  publishedDate: Date,
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
