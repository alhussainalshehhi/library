const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    const formatted = books.map((b) => ({
      id: b._id,
      title: b.title,
      author: b.author,
      category: b.category,
      image: b.image,
      description: b.description,
    }));

    res.json(formatted);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, category, image, description } = req.body;

    if (!title || !author || !category) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const book = new Book({ title, author, category, image, description });
    await book.save();

    res.status(201).json({
      id: book._id,
      title: book.title,
      author: book.author,
      category: book.category,
      image: book.image,
      description: book.description,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      id: updated._id,
      title: updated.title,
      author: updated.author,
      category: updated.category,
      image: updated.image,
      description: updated.description,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};