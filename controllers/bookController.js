import Book from "../models/books.js";
import Review from "../models/reviews.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().limit(100);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchBooks = async (req, res) => {
  const { q } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { authors: { $regex: q, $options: "i" } },
        { isbn: { $regex: q, $options: "i" } },
      ],
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookDetails = async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).json({ error: "Book not found" });

    const reviews = await Review.find({ isbn });
    res.json({ ...book.toObject(), reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
