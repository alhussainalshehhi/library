import { useContext } from "react";
import { BorrowContext } from "../context/BorrowContext";

function BorrowedBooks() {
  const { borrowedBooks, returnBook } = useContext(BorrowContext);

  return (
    <div className="page borrowed-page">
      <h1>Your Borrowed Books</h1>

      {borrowedBooks.length === 0 ? (
        <div className="empty-state">
          <h2>No Books Borrowed 📚</h2>
          <p>You haven’t borrowed any books yet.</p>

          <button onClick={() => (window.location.href = "/books")}>
            Browse Books
          </button>
        </div>
      ) : (
        <div className="borrowed-list">
          {borrowedBooks.map((book) => {
            const [day, month, year] = book.returnDate.split("/");
            const returnDateObj = new Date(`${year}-${month}-${day}`);
            const isOverdue = returnDateObj < new Date();

            return (
              <div key={book.id} className="borrowed-item">
                <img src={book.image} alt={book.title} />

                <div className="borrowed-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>

                  <p className="date">Borrowed: {book.borrowedAt}</p>

                  <p className="date">Return by: {book.returnDate}</p>

                  <p className={isOverdue ? "overdue" : "active"}>
                    {isOverdue ? "Overdue" : "Active"}
                  </p>
                </div>

                <button
                  className="return-btn"
                  onClick={() => returnBook(book.id)}
                >
                  Return
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BorrowedBooks;
