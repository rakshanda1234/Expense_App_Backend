const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");

const app = express();
const sequelize = require("./util/database");
const User = require("./models/user");
const Expense = require("./models/expenses");
const Order = require("./models/orders");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchaseRoutes");

dotenv.config();
app.use(cors());
app.use(userRoutes);

app.use(express.json());

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);
