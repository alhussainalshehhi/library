import { useState, useEffect } from "react";
import API from "../api";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    description: "",
  });

  // 🔹 FETCH BOOKS
  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔹 ADD BOOK
  const addBook = async (e) => {
    e.preventDefault();

    try {
      await API.post("/books", form);
      fetchBooks();
      setForm({
        title: "",
        author: "",
        category: "",
        image: "",
        description: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 DELETE
  const deleteBook = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 EDIT
  const handleEdit = (book) => {
    setEditingId(book._id);
    setForm(book);
  };

  // 🔹 UPDATE
  const updateBook = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/books/${editingId}`, form);
      fetchBooks();
      setEditingId(null);
      setForm({
        title: "",
        author: "",
        category: "",
        image: "",
        description: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page admin-page">

      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-subtitle">Manage books in the system</p>

      <div className="admin-container">

        {/* FORM */}
        <div className="admin-form">
          <h2>{editingId ? "Edit Book" : "Add Book"}</h2>

          <form onSubmit={editingId ? updateBook : addBook}>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />

            <input
              placeholder="Author"
              value={form.author}
              onChange={(e) =>
                setForm({ ...form, author: e.target.value })
              }
              required
            />

            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              required
            />

            <input
              placeholder="Image URL"
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <button type="submit">
              {editingId ? "Update Book" : "Add Book"}
            </button>
          </form>
        </div>

        {/* BOOK LIST */}
        <div className="admin-books">
          <h2>All Books</h2>

          {books.map((book) => (
            <div key={book._id} className="admin-book-card">

              <img src={book.image} alt={book.title} />

              <div className="admin-book-info">
                <strong>{book.title}</strong>
                <p>{book.author}</p>
                <span className="category">{book.category}</span>
              </div>

              <div className="admin-actions">
                <button onClick={() => handleEdit(book)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteBook(book._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;