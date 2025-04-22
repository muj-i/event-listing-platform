import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import EventList from "./pages/EventList";
import EventDetail from "./pages/EventDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EventListing from "./pages/EventListing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";


const App = () => {
  return (
    <Router>
      <Header />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventListing />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      <Footer />
    </Router>
  );
};

export default App;