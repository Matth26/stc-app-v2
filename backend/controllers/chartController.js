const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Chart = require('../models/chartModel');

// @desc    Get user charts
// @route   GET /api/charts
// @access  Private
const getCharts = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const charts = await Chart.find({ user: req.user.id });

  res.status(200).json(charts);
});

// @desc    Get user chart
// @route   GET /api/charts/:id
// @access  Private
const getChart = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const chart = await Chart.findById(req.params.id);

  if (!chart) {
    res.status(404);
    throw new Error('Chart not found');
  }

  if (chart.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json(chart);
});

// @desc    Get
// @route   POST /api/charts
// @access  Private
const createChart = asyncHandler(async (req, res) => {
  const { name, current, goal, steps } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please add a name');
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const chart = await Chart.create({
    user: req.user.id,
    name,
    current,
    goal,
    steps,
  });

  res.status(201).json(chart);
});

// @desc    Delete user chart
// @route   DELETE /api/charts/:id
// @access  Private
const deleteChart = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const chart = await Chart.findById(req.params.id);

  if (!chart) {
    res.status(404);
    throw new Error('Chart not found');
  }

  if (chart.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await chart.remove();

  res.status(200).json({ success: true });
});

// @desc    Update user chart
// @route   PUT /api/charts/:id
// @access  Private
const updateChart = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const chart = await Chart.findById(req.params.id);

  if (!chart) {
    res.status(404);
    throw new Error('Chart not found');
  }

  if (chart.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedChart = await Chart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedChart);
});

module.exports = {
  getCharts,
  createChart,
  getChart,
  deleteChart,
  updateChart,
};
