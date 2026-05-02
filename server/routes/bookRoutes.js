const express = require("express");
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getBooks);

router.get("/:id", async (req, res) => {
  try {
    const Book = require("../models/Book");
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(book);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  addBook
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateBook
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteBook
);

module.exports = router;