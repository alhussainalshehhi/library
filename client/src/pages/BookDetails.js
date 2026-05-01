import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");
  const [borrowed, setBorrowed] = useState(false);

  useEffect(() => {
    setMessage("");
  }, [id]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);

        const found = res.data.find((b) => b._id === id);
        setBook(found);
      } catch {
        console.log("Error fetching book");
      }
    };

    fetchBooks();
  }, [id]);

  useEffect(() => {
    const checkBorrowed = async () => {
      try {
        const res = await API.get("/borrow");
        const exists = res.data.find((b) => b.bookId._id === id);
        if (exists) setBorrowed(true);
      } catch {}
    };

    checkBorrowed();
  }, [id]);

  if (!book) return <h2>Loading...</h2>;

  const currentIndex = books.findIndex((b) => b._id === id);
  const prevBook = books[currentIndex - 1];
  const nextBook = books[currentIndex + 1];

  const handleBorrow = async () => {
    try {
      await API.post("/borrow", { bookId: book._id });
      setMessage("Book borrowed successfully");
      setBorrowed(true);
    } catch {
      setMessage("You already borrowed this book");
      setBorrowed(true);
    }
  };

  return (
    <div className="page book-details">

      <div className="top-bar">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
      </div>

      <div className="book-content">
        <img src={book.image} alt={book.title} />

        <div className="book-info">
          <h1>{book.title}</h1>

          <p>
            <strong>Author:</strong> {book.author}
          </p>

          <p>{book.description}</p>

          <button
            className="borrow-btn"
            onClick={handleBorrow}
            disabled={borrowed}
          >
            {borrowed ? "Already Borrowed" : "Borrow Book"}
          </button>

          {message && <p className="success-msg">{message}</p>}
        </div>
      </div>

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