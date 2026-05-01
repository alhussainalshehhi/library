import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Library</Link>

      <div className="nav-links">
        <Link to="/books">Books</Link>

        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <Link to="/borrowed">My Books</Link>}

        {user?.role === "admin" && (
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