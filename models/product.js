module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      unique: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false,
    },
    description: { 
      type: DataTypes.STRING,
      field: 'description',
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAvailable:{
      type : DataTypes.BOOLEAN,
      allowNull:false,
      default: true,
    },
  }, {
    freezeTableName: true,
    tableName: 'products',
    paranoid: true,
    timestamps: true
  });

  product.associate = function (models) {
    product.belongsTo(models.category, { foreignKey: 'categoryId', as: 'productCategory' });
    product.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
  };

  return product;
};