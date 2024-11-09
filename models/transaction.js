module.exports = (sequelize, DataTypes) => {
    const transaction = sequelize.define("transaction", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'INR',
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING',
      },
    }, {
      freezeTableName: true,
      tableName: 'transaction',
      paranoid: true,
      timestamps: true
    });
  
    return transaction;
  };
  