import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const [borrowed, setBorrowed] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksRes = await API.get("/books");
        setBooks(booksRes.data);

        const borrowRes = await API.get("/borrow");
        setBorrowed(borrowRes.data);
      } catch {
        console.log("Error loading dashboard");
      }
    };

    fetchData();
  }, []);

  const recommended = books.slice(0, 4);

  return (
    <div className="page dashboard">

      <h1>Welcome Back 👋</h1>
      <p>Here’s your library activity</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>{borrowed.length}</h2>
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

      <h2>Your Borrowed Books</h2>

      <div className="books-grid">
        {borrowed.length === 0 ? (
          <p>No books borrowed yet.</p>
        ) : (
          borrowed.map((item) => (
            <div key={item._id} className="book-card">
              <img src={item.bookId.image} alt="" />
              <h3>{item.bookId.title}</h3>
            </div>
          ))
        )}
      </div>

      <h2>Recommended Books</h2>

      <div className="books-grid">
        {recommended.map((book) => (
          <Link
            to={`/book/${book._id}`}
            key={book._id}
            className="book-link"
          >
            <div className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/books">
          <button className="browse-btn">Browse More Books</button>
        </Link>
      </div>

    </div>
  );
}

export default Dashboard;