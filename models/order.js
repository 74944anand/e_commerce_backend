module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define("order", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      razorpayOrderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
        defaultValue: 'pending',
      },
    }, {
      sequelize,
      modelName: 'order',
      timestamps: true,
    });
  
    order.associate = function (models) {
      order.hasMany(models.orderItem, { as: 'orders', foreignKey: 'orderId' });
      order.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
    };
  
    return order;
  };
  