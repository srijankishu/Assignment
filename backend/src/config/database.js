const { Sequelize } = require("sequelize");
const path = require("path");

// SQLite database file stored locally
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../database.sqlite"),
  logging: false,
});

module.exports = sequelize;
