import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent (demo)");
    setForm({ name: "", email: "", message: "" });
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
      </div>

    </div>
  );
}

export default Contact;