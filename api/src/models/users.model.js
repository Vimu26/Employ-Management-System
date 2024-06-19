const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("dashboard", "root", "123456", {
  host: "localhost",
  dialect: "mysql"
});

const User = sequelize.define(
  "users",
  {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false
  }
);

module.exports = User;
