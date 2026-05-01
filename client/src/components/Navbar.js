import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Library</Link>

      <div className="nav-links">
        <Link to="/books">Books</Link>

        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <Link to="/borrowed">My Books</Link>}
        {user && <Link to="/contact">Contact</Link>}

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