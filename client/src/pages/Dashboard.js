import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const [borrowed, setBorrowed] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const booksRes = await API.get("/books");
        setBooks(booksRes.data);

        const borrowRes = await API.get("/borrow");
        setBorrowed(borrowRes.data);
      } catch {
        console.log("Error loading dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const recommended = books.slice(0, 4);

  let borrowedContent;

  if (!token) {
    borrowedContent = (
      <div className="empty-state">
        <h2>Please login to view your dashboard</h2>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    );
  } else if (loading) {
    borrowedContent = <p>Loading...</p>;
  } else if (borrowed.length === 0) {
    borrowedContent = <p>No books borrowed yet.</p>;
  } else {
    borrowedContent = borrowed.map((item) => (
      <div key={item._id} className="book-card">
        <img src={item.bookId.image} alt="" />
        <h3>{item.bookId.title}</h3>
      </div>
    ));
  }

  return (
    <div className="page dashboard">

      <h1>Welcome Back 👋</h1>
      <p>Here’s your library activity</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>{token ? borrowed.length : 0}</h2>
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
        {borrowedContent}
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