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

router.get("/books", getBooks);

router.post(
  "/books",
  authMiddleware,
  roleMiddleware("admin"),
  addBook
);

router.put(
  "/books/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateBook
);

router.delete(
  "/books/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteBook
);

module.exports = router;