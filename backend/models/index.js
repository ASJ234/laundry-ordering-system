const defineUser = require('./User');
const defineOrder = require('./Order');
const defineNotification = require('./Notification');

const initModels = (sequelize) => {
  const User = defineUser(sequelize);
  const Order = defineOrder(sequelize);
  const Notification = defineNotification(sequelize);

  // Define associations
  User.hasMany(Order, {
    foreignKey: 'userId',
    as: 'orders'
  });

  Order.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });

  User.hasMany(Notification, {
    foreignKey: 'userId',
    as: 'notifications'
  });

  Notification.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });

  // Optional convenience association for order-linked notifications
  Notification.belongsTo(Order, {
    foreignKey: 'orderId',
    as: 'order'
  });

  return {
    User,
    Order,
    Notification
  };
};

module.exports = initModels;
