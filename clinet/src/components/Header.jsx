import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Eventify</h1>
      <nav>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/events" className="mr-4">Events</Link>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/login" className="mr-2">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;