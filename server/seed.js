const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./db");
const Book = require("./models/Book");

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/15175523-L.jpg",
    description:
      "A classic novel set in the 1920s that explores wealth, love, and the illusion of the American Dream through the mysterious life of Jay Gatsby.",
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    description:
      "A dystopian novel depicting a totalitarian society under constant surveillance, where independent thought is suppressed and truth is controlled.",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/14627222-L.jpg",
    description:
      "A fantasy adventure following Bilbo Baggins as he joins a group of dwarves on a dangerous journey to reclaim their homeland from a dragon.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    image: "https://covers.openlibrary.org/b/id/8090214-L.jpg",
    description:
      "A romantic novel that explores love, social class, and personal growth.",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/15153500-L.jpg",
    description:
      "A powerful story addressing racial injustice and moral growth in the American South.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/15172466-L.jpg",
    description:
      "A coming-of-age story that follows Holden Caulfield.",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/14846947-L.jpg",
    description:
      "A futuristic novel portraying a highly controlled society driven by technology.",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/15092781-L.jpg",
    description:
      "A science fiction epic set on a desert planet exploring politics and survival.",
  },
  {
    title: "Harry Potter and the Sorcerer’s Stone",
    author: "J.K. Rowling",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/15154728-L.jpg",
    description:
      "A young boy discovers he is a wizard and begins his magical journey.",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/15131000-L.jpg",
    description:
      "An epic quest to destroy a powerful ring and save Middle-earth.",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/15121528-L.jpg",
    description:
      "A journey about dreams, destiny, and personal discovery.",
  },
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    category: "Romance",
    image: "https://covers.openlibrary.org/b/id/7285167-L.jpg",
    description:
      "A love story between two teenagers dealing with illness.",
  },
  {
    title: "Twilight",
    author: "Stephenie Meyer",
    category: "Romance",
    image: "https://covers.openlibrary.org/b/id/14352258-L.jpg",
    description:
      "A supernatural romance story between a human and a vampire.",
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/15139410-L.jpg",
    description:
      "A survival competition in a dystopian world.",
  },
  {
    title: "Percy Jackson & The Lightning Thief",
    author: "Rick Riordan",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/14858779-L.jpg",
    description:
      "A modern mythological adventure with Greek gods.",
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    category: "Romance",
    image: "https://covers.openlibrary.org/b/id/12195363-L.jpg",
    description:
      "A story of love, independence, and personal growth.",
  },
  {
    title: "Dracula",
    author: "Bram Stoker",
    category: "Fantasy",
    image: "https://covers.openlibrary.org/b/id/12622155-L.jpg",
    description:
      "A gothic horror novel about a vampire count.",
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/12752093-L.jpg",
    description:
      "A scientist creates life with tragic consequences.",
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/15162763-L.jpg",
    description:
      "A story of friendship, betrayal, and redemption.",
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    category: "Novel",
    image: "https://covers.openlibrary.org/b/id/11567416-L.jpg",
    description:
      "A psychological thriller about a missing wife.",
  },
  {
    title: "The Maze Runner",
    author: "James Dashner",
    category: "Science Fiction",
    image: "https://covers.openlibrary.org/b/id/14830679-L.jpg",
    description:
      "A dystopian survival story set in a mysterious maze.",
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    await Book.deleteMany();
    await Book.insertMany(books);

    console.log("Books seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();