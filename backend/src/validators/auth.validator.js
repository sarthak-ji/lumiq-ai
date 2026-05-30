import { body, validationResult } from 'express-validator';



// ==================== ERROR HANDLER MIDDLEWARE ====================
// Checks for validation errors and returns them
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
      }, {}),
    });
  }

  next();
};



// ==================== REGISTER VALIDATORS ====================
// Validates incoming data for register API
export const registerValidators = [
  // Validate username: required, min 3 chars, max 50 chars
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .trim(),

  // Validate email: required, must be valid email format
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  // Validate password: required, min 6 chars, max 128 chars
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  // // Validate password confirmation: must match password
  // body('confirmPassword')
  //   .notEmpty()
  //   .withMessage('Please confirm your password')
  //   .custom((value, { req }) => {
  //     if (value !== req.body.password) {
  //       throw new Error('Passwords do not match');
  //     }
  //     return true;
  //   }),


    handleValidationErrors

];

// ==================== LOGIN VALIDATORS ====================
// Validates incoming data for login API
export const loginValidators = [
  // Validate email: required, must be valid email format
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  // Validate password: required
  body('password')
    .notEmpty()
    .withMessage('Password is required'),

    
    handleValidationErrors

];


