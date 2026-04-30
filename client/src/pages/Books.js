import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || book.category === category)
  );

  return (
    <div className="page books-page">
      <h1>Book Catalog</h1>

      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "10px", width: "250px", marginTop: "20px" }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        <option value="All">All Categories</option>
        <option value="Novel">Novel</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Romance">Romance</option>
      </select>

      <div className="books-grid">
        {filteredBooks.map((book) => (
          <Link
            to={`/book/${book._id}`}
            key={book._id}
            className="book-link"
          >
            <div className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Books;