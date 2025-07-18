const Book = require('../models/Book');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all books
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate('user', 'name email');
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single book
exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('user', 'name email');

    if (!book) {
      return next(
        new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new book
exports.createBook = async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

// @desc    Update book
exports.updateBook = async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return next(
        new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is book owner
    if (book.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this book`,
          401
        )
      );
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(
        new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is book owner
    if (book.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this book`,
          401
        )
      );
    }

    await book.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};