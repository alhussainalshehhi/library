const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  borrowedAt: String,
  returnDate: String,
});

module.exports = mongoose.model("Borrow", borrowSchema);