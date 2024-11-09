
module.exports = (sequelize, DataTypes) => {
  const cartItem = sequelize.define("cartItem", {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      cartId: {
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
          defaultValue: 1,
      }
  }, {
      freezeTableName: true,
      tableName: 'cart_item',
      paranoid: true,
      timestamps: true
  });

  cartItem.associate = function (models) {
      cartItem.belongsTo(models.cart, { foreignKey: 'cartId', as: 'cart' });
      cartItem.belongsTo(models.product, { foreignKey: 'productId', as: 'product' });
  };

  return cartItem;
};
