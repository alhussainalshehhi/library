const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowedAt: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

borrowSchema.index({ userId: 1, bookId: 1 }, { unique: true });

module.exports = mongoose.model("Borrow", borrowSchema);