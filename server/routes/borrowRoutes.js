const express = require("express");
const Borrow = require("../models/Borrow");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { bookId } = req.body;

    const exists = await Borrow.findOne({
      userId: req.user.id,
      bookId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already borrowed" });
    }

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

    res.status(201).json(borrow);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const books = await Borrow.find({ userId: req.user.id }).populate("bookId");
  res.json(books);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Borrow.findByIdAndDelete(req.params.id);
  res.json({ message: "Returned" });
});

module.exports = router;