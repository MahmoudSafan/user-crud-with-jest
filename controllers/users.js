const User = require("../models/Users.js");
const ErrorResponse = require("../utils/errorResponse.js");
const { asyncHandler } = require("../middleware/asyncHandler.js");

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find();
	return res.status(200).json({
		success: true,
		count: users.length,
		data: users,
	});
});

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findById(id);

	if (!user) {
		return res.status(400).json({ success: false });
	}

	return res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc    Create user
// @route   POST /api/v1/users
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
	const user = await User.create(req.body);

	return res.status(201).json({
		success: true,
		data: user,
	});
});

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Public
exports.updateUser = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findByIdAndUpdate(id, req.body, { new: true });

	if (!user) {
		return next(new ErrorResponse(`User not found with id of ${id}`, 404));
	}

	return res.status(200).json({ success: true, data: user });
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Public
exports.deleteUser = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findByIdAndDelete(id);

	if (!user) {
		return next(new ErrorResponse(`User not found with id of ${id}`, 404));
	}

	return res.status(200).json({ success: true, data: {} });
});
