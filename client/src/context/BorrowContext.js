import { createContext, useState } from "react";

export const BorrowContext = createContext();

function BorrowProvider({ children }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const borrowBook = (book) => {
    setBorrowedBooks((prev) => {
      // prevent duplicates
      const exists = prev.find((b) => b.id === book.id);
      if (exists) return prev;

      const today = new Date();
      const returnDate = new Date();
      returnDate.setDate(today.getDate() + 7);

      return [
        ...prev,
        {
          ...book,
          borrowedAt: today.toLocaleDateString(),
          returnDate: returnDate.toLocaleDateString(),
        },
      ];
    });
  };

  const returnBook = (id) => {
    setBorrowedBooks((prev) =>
      prev.filter((book) => book.id !== id)
    );
  };

  return (
    <BorrowContext.Provider
      value={{ borrowedBooks, borrowBook, returnBook }}
    >
      {children}
    </BorrowContext.Provider>
  );
}

export default BorrowProvider;