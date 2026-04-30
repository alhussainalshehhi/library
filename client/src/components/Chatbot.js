import { useState, useEffect, useRef } from "react";
import robot from "../assets/robot.png";
import user from "../assets/user.png";
import books from "../data/books";

function Chatbot() {
  const [messages, setMessages] = useState([
    { message: "Hello! Ask me about books 😊", sender: "robot", id: 1 },
  ]);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

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

    const foundBook = books.find((b) => lower.includes(b.title.toLowerCase()));

    if (foundBook) {
      if (lower.includes("description") || lower.includes("about")) {
        return `📖 ${foundBook.title}: ${foundBook.description}`;
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
      return "Click on a book and press 'Borrow Book' to borrow it.";
    }

    if (lower.includes("return")) {
      return "You can return books from the Borrowed Books page.";
    }

    if (lower.includes("help")) {
      return "Try asking me about a book, like 'Dune description' or 'How to borrow'.";
    }

    return "I'm not sure 🤔 Try asking about a book or how to borrow one.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { message: input, sender: "user", id: Date.now() },
    ];

    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotResponse(input);

      setMessages([
        ...newMessages,
        { message: reply, sender: "robot", id: Date.now() + 1 },
      ]);

      setIsTyping(false);
    }, 800);
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
                {msg.sender === "robot" && <img src={robot} alt="robot" />}

                <div className="chat-text">{msg.message}</div>

                {msg.sender === "user" && <img src={user} alt="user" />}
              </div>
            ))}

            {isTyping && (
              <div className="chat-message robot">
                <img src={robot} alt="robot" />
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
              placeholder="Type a message..."
            />

            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;
