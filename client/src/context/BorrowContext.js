import { createContext, useState, useEffect, useMemo } from "react";
import API from "../api";

export const BorrowContext = createContext();

function BorrowProvider({ children }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const fetchBorrowed = async () => {
    try {
      const res = await API.get("/borrow");
      setBorrowedBooks(res.data);
    } catch {
      setBorrowedBooks([]);
    }
  };

  useEffect(() => {
    fetchBorrowed();
  }, []);

  const borrowBook = async (bookId) => {
    try {
      await API.post("/borrow", { bookId });
      fetchBorrowed();
      return { success: true };
    } catch {
      return { success: false };
    }
  };

  const returnBook = async (id) => {
    try {
      await API.delete(`/borrow/${id}`);
      fetchBorrowed();
    } catch {
      console.log("Error returning book");
    }
  };

  const value = useMemo(() => ({
    borrowedBooks,
    borrowBook,
    returnBook,
    refreshBorrowed: fetchBorrowed,
  }), [borrowedBooks]);

  return (
    <BorrowContext.Provider value={value}>
      {children}
    </BorrowContext.Provider>
  );
}

export default BorrowProvider;