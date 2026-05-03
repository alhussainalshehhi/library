import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function BorrowedBooks() {
  const [borrowed, setBorrowed] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB");
  };

  const fetchBorrowed = async () => {
    try {
      const res = await API.get("/borrow");
      setBorrowed(res.data);
    } catch {
      setBorrowed([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetchBorrowed();
  }, []);

  const handleReturn = async (id) => {
    try {
      await API.delete(`/borrow/${id}`);
      fetchBorrowed();
    } catch {
      console.log("Error returning book");
    }
  };

  let content;

  const token = localStorage.getItem("token");

  if (!token) {
    content = (
      <div className="empty-state">
        <h2>Please login to view your borrowed books</h2>
        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    );
  } else if (loading) {
    content = <p>Loading...</p>;
  } else if (borrowed.length === 0) {
    content = (
      <div className="empty-state">
        <h2>No borrowed books yet</h2>
        <button onClick={() => navigate("/books")}>
          Browse Books
        </button>
      </div>
    );
  } else {
    content = borrowed.map((item) => (
      <div key={item._id} className="borrowed-item">
        <img src={item.bookId.image} alt={item.bookId.title} />

        <div className="borrowed-info">
          <h3>{item.bookId.title}</h3>
          <p>{item.bookId.author}</p>

          <p className="date">
            Borrowed: {formatDate(item.borrowedAt)}
          </p>
          <p className="date">
            Return: {formatDate(item.returnDate)}
          </p>
        </div>

        <button
          className="return-btn"
          onClick={() => handleReturn(item._id)}
        >
          Return
        </button>
      </div>
    ));
  }

  return (
    <div className="page borrowed-page">
      <h1>My Books</h1>
      {content}
    </div>
  );
}

export default BorrowedBooks;