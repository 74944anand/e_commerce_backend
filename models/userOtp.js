module.exports = (sequelize, DataTypes) => {
    const userOtp = sequelize.define('userOtp', {
      otp: {
        type: DataTypes.INTEGER,
        field: 'otp',
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        field: 'is_verified',
        defaultValue: false,
      },
      otpFor: {
        type: DataTypes.STRING,
        field: 'otp_for',
        values: ['resetPassword'],
        defaultValue: null,
      },
      expiryTime: {
        type: DataTypes.DATE,
        field: 'expiry_time',
        allowNull: false,
      },
    }, {
      freezeTableName: true,
      tableName: 'user_otp',
    });
    userOtp.associate = (models) => {
      userOtp.belongsTo(models.user, { foreignKey: 'userId',as:'user' });
    };
    return userOtp;
  };