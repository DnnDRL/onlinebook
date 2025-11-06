import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import connectDB from "./config/db.js";

import bookRoutes from "./routes/books.js";
import userRoutes from "./routes/users.js";
import reviewRoutes from "./routes/reviews.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "📚 Welcome to the Bookstore API!",
    routes: {
      books: "/books",
      users: "/users",
      reviews: "/reviews"
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
