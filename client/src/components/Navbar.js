import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        Library
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/borrowed">Borrowed</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
      </div>

    </nav>
  );
}

export default Navbar;