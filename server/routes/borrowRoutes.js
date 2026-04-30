const express = require("express");
const Borrow = require("../models/Borrow");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// borrow book
router.post("/", authMiddleware, async (req, res) => {
  const { bookId } = req.body;

  const exists = await Borrow.findOne({
    userId: req.user.id,
    bookId,
  });

  if (exists) return res.json({ message: "Already borrowed" });

  const today = new Date();
  const returnDate = new Date();
  returnDate.setDate(today.getDate() + 7);

  const borrow = new Borrow({
    userId: req.user.id,
    bookId,
    borrowedAt: today.toLocaleDateString("en-GB"),
    returnDate: returnDate.toLocaleDateString("en-GB"),
  });

  await borrow.save();
  res.json(borrow);
});

// get user books
router.get("/", authMiddleware, async (req, res) => {
  const books = await Borrow.find({ userId: req.user.id });
  res.json(books);
});

module.exports = router;