module.exports = (sequelize, DataTypes) => {
    const upload = sequelize.define(
      'upload',
      {
        originalName: {
          type: DataTypes.STRING,
          allowNull: false,// Original file name
        },
        storedName: {
          type: DataTypes.STRING,
          allowNull: false,// Server-stored file name
        },
        filePath: {
          type: DataTypes.TEXT,
          allowNull: false, // Full path to the file
        },
        mimeType: {
          type: DataTypes.STRING,
          allowNull: false, // MIME type (e.g., image/jpeg)
        },
        fileSize: {
          type: DataTypes.BIGINT,
          allowNull: false, // File size in bytes
        },
        uploadedBy: {
          type: DataTypes.INTEGER,
          allowNull: false, // Foreign key for the user who uploaded the file
        },
        uploadedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: 'uploaded_at', // Timestamp for when the file was uploaded
        },
      },
      {
        freezeTableName: true,
        tableName: 'upload',
      }
    );
  
    upload.associate = (models) => {
      upload.belongsTo(models.user, {
        foreignKey: 'uploadedBy',
        as: 'userUploads',
      });
    };
  
    return upload;
  };
  