const express = require('express');
const router = express.Router();
const { getModels } = require('../config/db');
const { protect } = require('../middleware/auth');

// Pricing configuration
const PRICING = {
  'normal-wash': 5,
  'heavy-wash': 8,
  'delicate-wash': 7,
  'express-wash': 10
};

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { Order, User, Notification } = getModels();
    const { serviceType, quantity, notes } = req.body;

    const pricePerItem = PRICING[serviceType];
    const totalPrice = pricePerItem * quantity;

    const order = await Order.create({
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      serviceType,
      quantity,
      pricePerItem,
      totalPrice,
      notes
    });

    // Best-effort admin notification creation (don't block order placement)
    try {
      const admins = await User.findAll({
        where: { role: 'admin' },
        attributes: ['id']
      });

      if (admins.length > 0) {
        const title = 'New order received';
        const message = `Order #${order.id} placed by ${order.userName} - $${order.totalPrice}`;
        const data = {
          orderId: order.id,
          userId: order.userId,
          userName: order.userName,
          userEmail: order.userEmail,
          serviceType: order.serviceType,
          quantity: order.quantity,
          totalPrice: order.totalPrice
        };

        await Notification.bulkCreate(
          admins.map((a) => ({
            userId: a.id,
            type: 'order_created',
            title,
            message,
            data,
            orderId: order.id
          }))
        );
      }
    } catch (notifyErr) {
      console.error('Failed to create admin notification:', notifyErr);
    }

    res.status(201).json({
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

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { Order } = getModels();
    const orders = await Order.findAll({ 
      where: { userId: req.user.id },
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

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const { Order } = getModels();
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    // Make sure user owns the order
    if (order.userId !== req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

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

module.exports = router;
