import { useDispatch } from 'react-redux';
import { deleteBook } from '../../redux/slices/booksSlice';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const result = await dispatch(deleteBook(book._id));
      if (deleteBook.fulfilled.match(result)) {
        toast.success('Book deleted!');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="text-gray-600">By {book.author}</p>
      
      <div className="mt-4 flex space-x-2">
        <Link
          to={`/books/${book._id}/edit`}
          className="text-blue-600 hover:underline"
        >
          Edit
        </Link>
        <button 
          onClick={handleDelete}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;