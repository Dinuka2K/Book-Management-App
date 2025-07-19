import { useEffect } from 'react';
import api from '../../api/axios';

const BookList = () => {
   useEffect(() => {
    api.get('/books').then((res) => console.log('Books:', res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Book List</h1>
      <p>Book data will be fetched from API in next commits.</p>
    </div>
  );
};

export default BookList;