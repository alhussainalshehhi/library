import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BorrowContext } from "../context/BorrowContext";

function BorrowedBooks() {
  const { borrowedBooks } = useContext(BorrowContext);
  const navigate = useNavigate();

  return (
    <div className="page borrowed-list">

      {borrowedBooks.length === 0 ? (
        <div className="empty-state">
          <h2>No borrowed books yet</h2>
          <p>Start exploring and borrow your first book</p>
          <button onClick={() => navigate("/books")}>
            Browse Books
          </button>
        </div>
      ) : (
        borrowedBooks.map((book) => (
          <div key={book.id} className="borrowed-item">
            <img src={book.image} alt={book.title} />

            <div className="borrowed-info">
              <h3>{book.title}</h3>
              <p>{book.author}</p>

              <p className="date">Borrowed: {book.borrowedAt}</p>
              <p className="date">Return by: {book.returnDate}</p>
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default BorrowedBooks;