import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Library</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/contact">Contact</Link>

        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <Link to="/borrowed">My Books</Link>}

        {user && user.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}

        {user && (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;