import Review from "../models/reviews.js";
import Book from "../models/books.js";

// Get reviews for a book
export const getReviewsByISBN = async (req, res) => {
  try {
    const { isbn } = req.params;
    const reviews = await Review.find({ isbn });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a review (logged-in users)
export const addReview = async (req, res) => {
  try {
    const { isbn } = req.params;
    const { rating, comment } = req.body;
    const user = req.user;

    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).json({ error: "Book not found" });

    const newReview = await Review.create({
      book: book._id,
      isbn,
      user: user.id,
      username: user.username,
      rating,
      comment
    });

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    if (review.user.toString() !== userId)
      return res.status(403).json({ error: "Not authorized" });

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    if (review.user.toString() !== userId)
      return res.status(403).json({ error: "Not authorized" });

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
