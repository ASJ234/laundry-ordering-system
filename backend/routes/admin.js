const express = require('express');
const router = express.Router();
const { getModels } = require('../config/db');
const { protect, adminOnly } = require('../middleware/auth');

// @route   GET /api/admin/notifications
// @desc    Get admin notifications (for current admin)
// @access  Private/Admin
router.get('/notifications', protect, adminOnly, async (req, res) => {
  try {
    const { Notification } = getModels();
    const unreadOnly = req.query.unreadOnly === 'true';
    const limit = Math.min(parseInt(req.query.limit || '50', 10), 200);
    const offset = Math.max(parseInt(req.query.offset || '0', 10), 0);

    const where = { userId: req.user.id };
    if (unreadOnly) where.isRead = false;

    const { rows: notifications, count } = await Notification.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.json({
      success: true,
      count,
      notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/admin/notifications/unread-count
// @desc    Get unread notification count for current admin
// @access  Private/Admin
router.get('/notifications/unread-count', protect, adminOnly, async (req, res) => {
  try {
    const { Notification } = getModels();
    const unread = await Notification.count({
      where: { userId: req.user.id, isRead: false }
    });

    res.json({ success: true, unread });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/admin/notifications/:id/read
// @desc    Mark a single notification as read (current admin only)
// @access  Private/Admin
router.put('/notifications/:id/read', protect, adminOnly, async (req, res) => {
  try {
    const { Notification } = getModels();
    const notification = await Notification.findByPk(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    if (notification.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    res.json({
      success: true,
      notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/admin/notifications/read-all
// @desc    Mark all notifications as read for current admin
// @access  Private/Admin
router.put('/notifications/read-all', protect, adminOnly, async (req, res) => {
  try {
    const { Notification } = getModels();
    const [updated] = await Notification.update(
      { isRead: true, readAt: new Date() },
      { where: { userId: req.user.id, isRead: false } }
    );

    res.json({
      success: true,
      updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/orders', protect, adminOnly, async (req, res) => {
  try {
    const { Order } = getModels();
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   PUT /api/admin/orders/:id
// @desc    Update order status
// @access  Private/Admin
router.put('/orders/:id', protect, adminOnly, async (req, res) => {
  try {
    const { Order } = getModels();
    const { status } = req.body;

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   GET /api/admin/stats
// @desc    Get order statistics
// @access  Private/Admin
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const { Order } = getModels();
    const total = await Order.count();
    const pending = await Order.count({ where: { status: 'Pending' } });
    const washing = await Order.count({ where: { status: 'Washing' } });
    const completed = await Order.count({ where: { status: 'Completed' } });

    res.json({
      success: true,
      stats: {
        total,
        pending,
        washing,
        completed
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;
