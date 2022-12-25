const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-app", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
