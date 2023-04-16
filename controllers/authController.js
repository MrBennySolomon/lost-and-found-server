import crypto from 'crypto';
import ErrorResponse from '../utils/ErrorResponse.js';
import sendTokenResponse from '../utils/sendTokenResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';

// @desc    Register user
// @route   POST /auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.create({
    email,
    password,
  });

  // Send token to client
  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    // Important to return the same error message so no one can know the reason for login failure
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Send token to client
  sendTokenResponse(user, 200, res);
});

// @desc    Log user out
// @route   GET /auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', null);

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get current logged in user
// @route   POST /auth/current-user
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user details
// @route   PUT /auth/update-details
// @access  Private
export const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});