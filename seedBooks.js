import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/books.js";

dotenv.config();

const books = [
  {
    isbn: "9784088830803",
    title: "Blue Box",
    authors: ["Kouji Miura"],
    description: "A gentle and bittersweet story of youth, sports, and unspoken love — where effort on the court mirrors the struggles of the heart.",
    publisher: "Shueisha",
    publishedDate: new Date("2021-04-12")
  },
  {
    isbn: "9784592186132",
    title: "Fruits Basket",
    authors: ["Natsuki Takaya"],
    description: "A heartwarming and emotional tale about family, acceptance, and breaking free from the bonds of a mysterious curse.",
    publisher: "Hakusensha",
    publishedDate: new Date("1998-07-18")
  },
  {
    isbn: "9784088704531",
    title: "Kimi ni Todoke: From Me to You",
    authors: ["Karuho Shiina"],
    description: "A tender romance between a misunderstood girl and the boy who sees her for who she truly is — a story of friendship, courage, and first love.",
    publisher: "Shueisha",
    publishedDate: new Date("2006-08-11")
  },
  {
    isbn: "9784098718910",
    title: "I Want to Eat Your Pancreas",
    authors: ["Yoru Sumino", "Idumi Kirihara"],
    description: "A poignant and unforgettable story about life, death, and the impact of a fleeting connection that changes everything.",
    publisher: "Square Enix",
    publishedDate: new Date("2016-06-20")
  },
  {
    isbn: "9784088832531",
    title: "Ao Haru Ride",
    authors: ["Io Sakisaka"],
    description: "A nostalgic and emotional high school romance about growing up, rediscovering love, and the bittersweet pain of youth.",
    publisher: "Shueisha",
    publishedDate: new Date("2011-01-13")
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
