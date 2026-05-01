import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch {
        console.log("Error loading books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  let content;

  if (loading) {
    content = <p>Loading books...</p>;
  } else if (filteredBooks.length === 0) {
    content = <p>No books found.</p>;
  } else {
    content = (
      <div className="books-grid">
        {filteredBooks.map((book) => (
          <Link to={`/book/${book._id}`} key={book._id} className="book-link">
            <div className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="page books-page">
      <h1>Book Catalog</h1>

      <div className="books-controls">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Novel">Novel</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Romance">Romance</option>
        </select>
      </div>

      {content}
    </div>
  );
}

export default Books;