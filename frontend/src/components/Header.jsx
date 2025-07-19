import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="flex space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/books" className="hover:underline">Books</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </nav>
    </header>
  );
};

export default Header;