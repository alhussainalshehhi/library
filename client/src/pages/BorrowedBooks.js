import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function BorrowedBooks() {
  const [borrowed, setBorrowed] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrowed = async () => {
      try {
        const res = await API.get("/borrow");
        setBorrowed(res.data);
      } catch {
        console.log("Error loading borrowed books");
      }
    };

    fetchBorrowed();
  }, []);

  return (
    <div className="page borrowed-list">

      {borrowed.length === 0 ? (
        <div className="empty-state">
          <h2>No borrowed books yet</h2>
          <p>Start exploring and borrow your first book</p>
          <button onClick={() => navigate("/books")}>
            Browse Books
          </button>
        </div>
      ) : (
        borrowed.map((item) => (
          <div key={item._id} className="borrowed-item">
            <div className="borrowed-info">
              <h3>Book ID: {item.bookId}</h3>
              <p className="date">Borrowed: {item.borrowedAt}</p>
              <p className="date">Return: {item.returnDate}</p>
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default BorrowedBooks;