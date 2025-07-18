const { check, validationResult } = require('express-validator');

// Validation for user registration
const validateRegisterInput = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];

// Validation for user login
const validateLoginInput = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

// Validation for book creation/update
const validateBookInput = [
  check('title', 'Title is required').not().isEmpty(),
  check('author', 'Author is required').not().isEmpty(),
  check('genre', 'Genre is required').not().isEmpty(),
  check('publicationDate', 'Publication date is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateBookInput,
  handleValidationErrors,
};