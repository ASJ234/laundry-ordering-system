const { DataTypes } = require('sequelize');

const defineOrder = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serviceType: {
      type: DataTypes.ENUM('normal-wash', 'heavy-wash', 'delicate-wash', 'express-wash'),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please select a service type'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'Quantity must be at least 1'
        }
      }
    },
    pricePerItem: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Washing', 'Completed'),
      defaultValue: 'Pending'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'orders',
    timestamps: true
  });

  return Order;
};

module.exports = defineOrder;
