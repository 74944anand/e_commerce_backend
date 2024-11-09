module.exports = (sequelize, DataTypes) => {

const orderItem = sequelize.define("orderItem", {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'orderItem',
  timestamps: true,
});

orderItem.associate = function (models) {
    orderItem.hasMany(models.order, { as: 'orders', foreignKey: 'orderId' });
    orderItem.belongsTo(models.product, { foreignKey: 'prodcutId', as: 'product' });
  };

return orderItem;
}
