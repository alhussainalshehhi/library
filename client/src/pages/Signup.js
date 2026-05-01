import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await API.post("/auth/register", form);

      setSuccess("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      setForm({
        name: "",
        email: "",
        password: "",
      });

    } catch {
      setError("Signup failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">

        <h1>Signup</h1>

        <form onSubmit={handleSignup}>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </button>

        </form>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;