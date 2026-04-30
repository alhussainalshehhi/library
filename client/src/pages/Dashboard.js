import { useContext } from "react";
import { Link } from "react-router-dom";
import { BorrowContext } from "../context/BorrowContext";
import books from "../data/books";

function Dashboard() {
  const { borrowedBooks } = useContext(BorrowContext);

  const recommended = books.slice(0, 4);

  return (
    <div className="page dashboard">

      {/* WELCOME */}
      <h1>Welcome Back 👋</h1>
      <p>Here’s your library activity</p>

      {/* STATS */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>{borrowedBooks.length}</h2>
          <p>Books Borrowed</p>
        </div>

        <div className="dashboard-card">
          <h2>{books.length}</h2>
          <p>Total Books</p>
        </div>

        <div className="dashboard-card">
          <h2>4</h2>
          <p>Categories</p>
        </div>
      </div>

      {/* BORROWED BOOKS */}
      <h2>Your Borrowed Books</h2>

      <div className="books-grid">
        {borrowedBooks.length === 0 ? (
          <p>No books borrowed yet.</p>
        ) : (
          borrowedBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
            </div>
          ))
        )}
      </div>

      {/* RECOMMENDATIONS */}
      <h2>Recommended Books</h2>

      <div className="books-grid">
        {recommended.map((book) => (
          <Link
            to={`/book/${book.id}`}
            key={book.id}
            className="book-link"
          >
            <div className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* BROWSE BUTTON */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/books">
          <button className="browse-btn">Browse More Books</button>
        </Link>
      </div>

    </div>
  );
}

export default Dashboard;