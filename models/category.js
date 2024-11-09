module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define("category", {  // Ensure the model name matches 'product'
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAvailable:{
      type : DataTypes.BOOLEAN,
      allowNull:false,
      default: true,
    },
  }, {
    freezeTableName: true,
    tableName: 'category',
    paranoid: true,
    timestamps: true
  });

  category.associate = function (models) {
    category.hasMany(models.product, { as: 'productCategory', foreignKey: 'categoryId' });
    category.belongsTo(models.user, { foreignKey: 'userId', as: 'userCategories' });
  };

  return category;
};
