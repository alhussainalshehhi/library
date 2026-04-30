const express = require("express");
const Book = require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { title, author, category, image, description } = req.body;

    if (!title || !author || !category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const book = new Book({
      title,
      author,
      category,
      image,
      description,
    });

    await book.save();

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;