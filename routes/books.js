import express from "express";
import { getAllBooks, searchBooks, getBookDetails } from "../controllers/bookController.js";
const router = express.Router();

router.get("/", getAllBooks);
router.get("/search", searchBooks);
router.get("/:isbn", getBookDetails);

export default router;
