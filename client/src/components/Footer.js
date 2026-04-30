import { Link } from "react-router-dom";

function Footer() {
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
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/borrowed">Borrowed</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
        </div>

        <div>
          <h3>Stay Updated</h3>
          <p>Subscribe for new books</p>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      <div className="footer-bottom">© 2026 Online Library System</div>
    </footer>
  );
}

export default Footer;
