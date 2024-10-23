const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Define the User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image : {
    type: DataTypes.STRING,
    allowNull: true
  }
  // Add new fields here
}, {
  timestamps: true,
  // Enable automatic schema synchronization
 
});

module.exports = User;
