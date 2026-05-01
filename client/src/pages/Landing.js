import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function Landing() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch {
        console.log("Error loading featured books");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>

      <section className="hero">
        <div className="page">
          <h1>Welcome to the Online Library</h1>
          <p>Discover thousands of books and borrow them instantly.</p>

          <Link to="/books">
            <button>Browse Books</button>
          </Link>
        </div>
      </section>

      <section className="featured">
        <div className="page">
          <h2>Featured Books</h2>

          <div className="featured-grid">
            {books.slice(0, 3).map((book) => (
              <Link
                to={`/book/${book._id}`}
                key={book._id}
                className="featured-link"
              >
                <div className="featured-card">
                  <img src={book.image} alt={book.title} />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="page">
          <h2>Why Choose Our Library?</h2>

          <div className="features-container">
            <div className="feature-box">
              <h3>Large Collection</h3>
              <p>Explore books across many categories.</p>
            </div>

            <div className="feature-box">
              <h3>Easy Borrowing</h3>
              <p>Borrow books in just one click.</p>
            </div>

            <div className="feature-box">
              <h3>Track Progress</h3>
              <p>Manage all your borrowed books easily.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Landing;