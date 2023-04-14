import asyncHandler from '../middleware/asyncHandler.js';
import Item         from '../models/Item.js';

// @desc    Get all Items
// @route   GET /items
// @access  Public
export const getItems = asyncHandler(async (req, res, next) => { 
  // const items = await Item.find(req.params.id);
  const items = await Item.find();

  if (!items) {
    return next(new Error(`Items that end with '${req.params.id.slice(-6)}' not found`));
  }

  res.status(200).json({
    success: true,
    data: items,
  });
});

// @desc    Create an Item
// @route   POST /items
// @access  Public
export const createItem = asyncHandler(async (req, res, next) => {
  const item = await Item.create(req.body);

  res.status(201).json({
    success: true,
    data: item,
  });
});

// @desc    Get a single Item
// @route   GET /items/:id
// @access  Public
export const getItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(new Error(`Item that end with '${req.params.id.slice(-6)}' not found`));
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

// @desc    Update an Item
// @route   PUT /items/:id
// @access  Public
export const updateItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body);

  if (!item) {
    return next(new Error(`Item that end with '${req.params.id.slice(-6)}' not found`));
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});


// @desc    Delete an item
// @route   DELETE /items/:id
// @access  Public
export const deleteItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(new ErrorResponse(`Item that ends with '${req.params.id.slice(-6)}' was not found`, 404));
  }

  item.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});