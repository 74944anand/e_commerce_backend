const fs = require('fs'); // Import the filesystem module

module.exports = {
  "development": {
    "username": "avnadmin",
    "password": "AVNS_lRuj2Ne-KwJhe3k5Sfq",
    "database": "defaultdb",
    "port": 28801,
    "host": "pg-2c4f4a76-nimapinfotech-70e1.k.aivencloud.com",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "ca": fs.readFileSync(__dirname + '/../ca.pem'),  // Read the CA certificate
        "rejectUnauthorized": true // Ensures the certificate is verified
      }
    },
    "logging": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "development1": {
    "username": "postgres",
    "password": "root",
    "database": "product",
    "port": 5432,
    "host": "localhost",
    "dialect": "postgres",
    "logging": false
  }
};
