import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { BorrowContext } from "../context/BorrowContext";
import API from "../api";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { borrowBook } = useContext(BorrowContext);

  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);

        const foundBook = res.data.find((b) => b._id === id);
        setBook(foundBook);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooks();
  }, [id]);

  if (!book) return <h2>Loading...</h2>;

  const currentIndex = books.findIndex((b) => b._id === id);

  const prevBook = books[currentIndex - 1];
  const nextBook = books[currentIndex + 1];

  const handleBorrow = () => {
    borrowBook(book);
  };

  return (
    <div className="page book-details">

      {/* BACK */}
      <div className="top-bar">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
      </div>

      {/* CONTENT */}
      <div className="book-content">
        <img src={book.image} alt={book.title} />

        <div className="book-info">
          <h1>{book.title}</h1>

          <p className="author">
            <strong>Author:</strong> {book.author}
          </p>

          <p className="description">{book.description}</p>

          <button className="borrow-btn" onClick={handleBorrow}>
            Borrow Book
          </button>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="book-navigation">

        {prevBook && (
          <button
            className="nav-btn left"
            onClick={() => navigate(`/book/${prevBook._id}`)}
          >
            ← {prevBook.title}
          </button>
        )}

        {nextBook && (
          <button
            className="nav-btn right"
            onClick={() => navigate(`/book/${nextBook._id}`)}
          >
            {nextBook.title} →
          </button>
        )}

      </div>

    </div>
  );
}

export default BookDetails;