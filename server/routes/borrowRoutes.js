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
      borrowedAt: today,
      returnDate: returnDate,
    });

    await borrow.save();

    const populated = await borrow.populate("bookId");

    res.status(201).json(populated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const borrows = await Borrow.find({ userId: req.user.id }).populate("bookId");

    res.json(borrows);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const borrow = await Borrow.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!borrow) {
      return res.status(404).json({ message: "Not found" });
    }

    await Borrow.findByIdAndDelete(req.params.id);

    res.json({ message: "Returned successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;