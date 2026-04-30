import { createContext, useState, useMemo } from "react";
import initialBooks from "../data/books";

export const BookContext = createContext();

function BookProvider({ children }) {
  const [books, setBooks] = useState(initialBooks);

  const addBook = (book) => {
    setBooks((prev) => [...prev, { ...book, id: Date.now() }]);
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBook = (updatedBook) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === updatedBook.id ? updatedBook : b
      )
    );
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