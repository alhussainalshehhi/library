import { useState, useEffect, useRef } from "react";
import robot from "../assets/robot.png";
import user from "../assets/user.png";
import API from "../api";

function Chatbot() {
  const [messages, setMessages] = useState([
    { message: "Hello! Ask me about books 😊", sender: "robot", id: 1 },
  ]);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [books, setBooks] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch {}
    };

    fetchBooks();
  }, []);

  const getBotResponse = (text) => {
    const lower = text.toLowerCase();

    if (
      lower.includes("hello") ||
      lower.includes("hi") ||
      lower.includes("hey")
    ) {
      return "Hey! 👋 How can I help you today?";
    }

    if (lower === "yes" || lower.includes("yeah")) {
      return "Great! 😊 What would you like help with?";
    }

    const foundBook = books.find((b) =>
      lower.includes(b.title.toLowerCase())
    );

    if (foundBook) {
      if (lower.includes("description") || lower.includes("about")) {
        return `📖 ${foundBook.title}: ${foundBook.description}`;
      }

      if (lower.includes("author")) {
        return `${foundBook.title} is written by ${foundBook.author}.`;
      }

      if (lower.includes("borrow")) {
        return `You can borrow "${foundBook.title}" by opening it and clicking 'Borrow Book'.`;
      }

      return `📖 "${foundBook.title}" by ${foundBook.author} is available.`;
    }

    if (lower.includes("book") || lower.includes("library")) {
      return "You can explore all books in the Books page 📚";
    }

    if (lower.includes("borrow")) {
      return "Open any book and click 'Borrow Book' to borrow it.";
    }

    if (lower.includes("return")) {
      return "You can return books from the My Books page.";
    }

    if (lower.includes("login") || lower.includes("signup")) {
      return "You need to login or signup to borrow books.";
    }

    if (lower.includes("help")) {
      return "Try asking: 'Dune description' or 'How to borrow a book'.";
    }

    return "I'm not sure 🤔 Try asking about a book or borrowing.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      message: input,
      sender: "user",
      id: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotResponse(input);

      setMessages([
        ...updatedMessages,
        { message: reply, sender: "robot", id: Date.now() + 1 },
      ]);

      setIsTyping(false);
    }, 700);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <>
      <div className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </div>

      {isOpen && (
        <div className="chatbot">
          <div className="chat-header">
            Chatbot
            <span onClick={() => setIsOpen(false)}>✖</span>
          </div>

          <div className="chat-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.sender === "user"
                    ? "chat-message user"
                    : "chat-message robot"
                }
              >
                {msg.sender === "robot" && <img src={robot} alt="" />}
                <div className="chat-text">{msg.message}</div>
                {msg.sender === "user" && <img src={user} alt="" />}
              </div>
            ))}

            {isTyping && (
              <div className="chat-message robot">
                <img src={robot} alt="" />
                <div className="chat-text typing">Typing...</div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about books..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;