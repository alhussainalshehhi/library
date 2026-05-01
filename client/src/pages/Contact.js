import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  return (
    <div className="page contact-page">

      <div className="contact-card">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you</p>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            required
          />

          <button type="submit">Send Message</button>

        </form>

        {status && <p className="success-msg">{status}</p>}

      </div>

    </div>
  );
}

export default Contact;