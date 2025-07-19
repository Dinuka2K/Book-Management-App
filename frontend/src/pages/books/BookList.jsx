import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../redux/slices/booksSlice';

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
    </div>
  );
};

export default BookList;