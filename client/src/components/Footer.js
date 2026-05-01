import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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

          {user && <Link to="/dashboard">Dashboard</Link>}
          {user && <Link to="/borrowed">My Books</Link>}

          <Link to="/contact">Contact</Link>

          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/signup">Signup</Link>}

          {user && (
            <button onClick={handleLogout} className="footer-logout">
              Logout
            </button>
          )}
        </div>

        <div>
          <h3>Stay Updated</h3>
          <p>Feature coming soon</p>
          <input type="email" placeholder="Enter your email" disabled />
          <button disabled>Subscribe</button>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Online Library System
      </div>
    </footer>
  );
}

export default Footer;