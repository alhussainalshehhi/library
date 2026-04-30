import { Link } from "react-router-dom";
import books from "../data/books";

function Landing() {
  return (
    <div>
      <section className="page hero">
        <h1>Welcome to the Online Library</h1>
        <p>Discover thousands of books and borrow them instantly.</p>

        <Link to="/books">
          <button>Browse Books</button>
        </Link>
      </section>

      <section className="page featured">
        <h2>Featured Books</h2>

        <div className="page featured-grid">
          {books.slice(0, 3).map((book) => (
            <Link
              to={`/book/${book.id}`}
              key={book.id}
              className="page featured-link"
            >
              <div className="page featured-card">
                <img src={book.image} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="page features">
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
      </section>
    </div>
  );
}

export default Landing;
