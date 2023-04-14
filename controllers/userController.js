import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';

// @desc    Get all users
// @route   GET /users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res
    .status(200)
    .json({
      success: true,
      data: users
    });
  // res.status(200).json(res.advancedResults);
});

// @desc    Get a single user
// @route   GET /users/:id
// @access  Private/Admin
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`No user found with id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({
      success: true,
      data: user
    });
});

// @desc    Create a user
// @route   POST /users
// @access  Private/Admin
export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  console.log('inside create user');
  const token = user.getSignedJwtToken();
  res
    .status(201)
    .json({
      success: true,
      data: token
    });
});

// @desc    Update a user
// @route   PUT /users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
  // let user = await User.findById(req.params.id);
  // console.log('user', user);
  // if (!user) {
  //   return next(
  //     new ErrorResponse(`No user found with id of ${req.params.id}`, 404)
  //   );
  // }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res
    .status(200)
    .json({
      success: true,
      data: user
    });
});

// @desc    Delete a user
// @route   PUT /users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`No user found with id of ${req.params.id}`, 404)
    );
  }

  await User.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({
      success: true,
      data: {}
    });
});