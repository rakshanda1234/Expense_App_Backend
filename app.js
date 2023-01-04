const express = require("express");
var cors = require("cors");
const app = express();
const sequelize = require("./util/database");
const User = require("./models/user");
const Expense = require("./models/expenses");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

app.use(cors());
app.use(userRoutes);

app.use(express.json());

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

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
