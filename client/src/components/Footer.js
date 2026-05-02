import { Link } from "react-router-dom";
import { useState } from "react";

function Footer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter an email");
      return;
    }

    setMessage("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>Online Library</h3>
          <p>Browse and borrow books anytime, anywhere.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/contact">Contact</Link>

          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/signup">Signup</Link>}

          {user && <Link to="/dashboard">Dashboard</Link>}
          {user && <Link to="/borrowed">My Books</Link>}
        </div>

        <div>
          <h3>Stay Updated</h3>
          <p>Subscribe for new books</p>

          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>

          {message && <p className="success-msg">{message}</p>}
        </div>
      </div>

      <div className="footer-bottom">© 2026 Online Library System</div>
    </footer>
  );
}

export default Footer;