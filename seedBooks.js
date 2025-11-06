import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/books.js";

dotenv.config();

const books = [
  {
    isbn: "9780143127741",
    title: "To Kill a Mockingbird",
    authors: ["Harper Lee"],
    description: "A novel about the serious issues of rape and racial inequality.",
    publisher: "J.B. Lippincott & Co.",
    publishedDate: new Date("1960-07-11")
  },
  {
    isbn: "9780679783272",
    title: "Pride and Prejudice",
    authors: ["Jane Austen"],
    description: "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
    publisher: "T. Egerton, Whitehall",
    publishedDate: new Date("1813-01-28")
  },
  {
    isbn: "9780743273565",
    title: "The Great Gatsby",
    authors: ["F. Scott Fitzgerald"],
    description: "A novel set in the Jazz Age that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.",
    publisher: "Charles Scribner's Sons",
    publishedDate: new Date("1925-04-10")
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected. Seeding books...");
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log("🌱 Books seeded successfully!");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Error seeding books:", err);
    process.exit(1);
  });
