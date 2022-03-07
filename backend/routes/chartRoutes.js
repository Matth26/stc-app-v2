// Routes for /api/users/
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  getCharts,
  getChart,
  createChart,
  deleteChart,
  updateChart,
} = require('../controllers/chartController');

router.route('/').get(protect, getCharts).post(protect, createChart);
router
  .route('/:id')
  .get(protect, getChart)
  .delete(protect, deleteChart)
  .put(protect, updateChart);

module.exports = router;
