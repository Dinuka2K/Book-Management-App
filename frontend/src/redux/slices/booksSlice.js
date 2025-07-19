import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/books');
      return response.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch books');
    }
  }
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (bookData, { rejectWithValue }) => {
    try {
      const res = await api.post('/books', bookData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to add book');
    }
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (bookId, { rejectWithValue }) => {
    try {
      await api.delete(`/books/${bookId}`);
      return bookId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to delete book');
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book._id !== action.payload);
      });
  }
});

export default booksSlice.reducer;
export const { clearBookError } = booksSlice.actions;