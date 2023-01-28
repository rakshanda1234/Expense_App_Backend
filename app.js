const express = require("express");
const fs = require("fs");
const https = require("https");

const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
//morgan is a Node. js and Express middleware to log HTTP requests and errors, and simplifies the process
const accessLogStream = fs.createWriteStream("access.log", { flag: "a" });

const app = express();
const sequelize = require("./util/database");
const User = require("./models/user");
const Expense = require("./models/expenses");
const Order = require("./models/orders");
const Forgotpassword = require("./models/forgotPassword");
const DownloadUrl = require("./models/downloadUrls");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchaseRoutes");
const ForgotPasswordRoutes = require("./routes/forgotpassword");
const { env } = require("process");

dotenv.config();

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());
app.use(userRoutes);

app.use(express.json());

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/password", ForgotPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(DownloadUrl);
DownloadUrl.belongsTo(User);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 3000);
