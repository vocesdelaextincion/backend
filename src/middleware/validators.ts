import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware to handle the result of the validators
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

// Validation rules for the register endpoint
export const registerValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
];

// Validation rules for the login endpoint
export const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required.'),
];

// Validation rules for the forgot password endpoint
export const forgotPasswordValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),
];

// Validation rules for the reset password endpoint
export const resetPasswordValidator = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
];

// Validation rules for creating a recording
export const createRecordingValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required.')
    .trim()
    .escape(),
  body('description')
    .optional()
    .trim()
    .escape(),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings.'),
  body('tags.*')
    .isString()
    .trim()
    .escape(),
];

// Validation rules for updating a recording
export const updateRecordingValidator = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty.')
    .trim()
    .escape(),
  body('description')
    .optional()
    .trim()
    .escape(),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings.'),
  body('tags.*')
    .optional()
    .isString()
    .trim()
    .escape(),
];
