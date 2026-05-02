import { useState, useEffect } from "react";
import API from "../api";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: "",
    author: "",
    category: "",
    image: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch {
      console.log("Error fetching books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const addBook = async (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.category) return;

    try {
      await API.post("/books", form);
      fetchBooks();
      resetForm();
    } catch {
      console.log("Error adding book");
    }
  };

  const deleteBook = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch {
      console.log("Error deleting book");
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      image: book.image || "",
      description: book.description || "",
    });
  };

  const updateBook = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/books/${editingId}`, form);
      fetchBooks();
      resetForm();
    } catch {
      console.log("Error updating book");
    }
  };

  return (
    <div className="page admin-page">
      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-subtitle">Manage books in the system</p>

      <div className="admin-container">
        <div className="admin-form">
          <h2>{editingId ? "Edit Book" : "Add Book"}</h2>

          <form onSubmit={editingId ? updateBook : addBook}>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <input
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              required
            />

            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />

            <input
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
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

            {editingId && (
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="admin-books">
          <h2>All Books</h2>

          {books.map((book) => (
            <div key={book._id} className="admin-book-card">
              <img src={book.image} alt="" />

              <div className="admin-book-info">
                <strong>{book.title}</strong>
                <p>{book.author}</p>
                <span className="category">{book.category}</span>
              </div>

              <div className="admin-actions">
                <button onClick={() => handleEdit(book)}>Edit</button>

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
