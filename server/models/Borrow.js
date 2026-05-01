const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  userId: String,
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  borrowedAt: String,
  returnDate: String,
});

module.exports = mongoose.model("Borrow", borrowSchema);