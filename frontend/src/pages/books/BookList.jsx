import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../redux/slices/booksSlice';
import { Link } from 'react-router-dom';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Book List</h1>
      {books.map((book) => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>By {book.author}</p>
        </div>
      ))}

      <Link to="/books/add" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"> Add New Book</Link>
      <Link to="/books/:id/edit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"> Update Book</Link>
    </div>
  );
};

export default BookList;