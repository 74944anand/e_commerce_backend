module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define("cart", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isOrdered: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        freezeTableName: true,
        tableName: 'cart',
        paranoid: true,
        timestamps: true
    });

    cart.associate = function (models) {
        cart.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
        cart.hasMany(models.cartItem, { foreignKey: 'cartId', as: 'items' });   
    };

    return cart;
};