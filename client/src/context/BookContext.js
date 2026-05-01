import { createContext, useState, useEffect, useMemo } from "react";
import API from "../api";

export const BookContext = createContext();

function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch {
        console.log("Error loading books");
      }
    };

    fetchBooks();
  }, []);

  const addBook = async (book) => {
    try {
      const res = await API.post("/books", book);
      setBooks((prev) => [...prev, res.data]);
    } catch {
      console.log("Error adding book");
    }
  };

  const deleteBook = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch {
      console.log("Error deleting book");
    }
  };

  const updateBook = async (updatedBook) => {
    try {
      const res = await API.put(`/books/${updatedBook._id}`, updatedBook);
      setBooks((prev) =>
        prev.map((b) =>
          b._id === updatedBook._id ? res.data : b
        )
      );
    } catch {
      console.log("Error updating book");
    }
  };

  const value = useMemo(() => ({
    books,
    addBook,
    deleteBook,
    updateBook,
  }), [books]);

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

export default BookProvider;