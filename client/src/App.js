import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import BookProvider from "./context/BookContext";
import BorrowProvider from "./context/BorrowContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import BorrowedBooks from "./pages/BorrowedBooks";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";

import "./styles/main.css";

function App() {
  return (
    <Router>
      <BookProvider>
        <BorrowProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/borrowed" element={<BorrowedBooks />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Chatbot />
        <Footer />
        </BorrowProvider>
       </BookProvider>
    </Router>
  );
}

export default App;
