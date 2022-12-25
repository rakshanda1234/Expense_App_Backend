const express = require("express");
var cors = require("cors");
const app = express();
const sequelize = require("./util/database");
const User = require("./models/user");

const userRoutes = require("./routes/user");

app.use(cors());
app.use(userRoutes);
app.use(express.json());

app.use("/user", userRoutes);

sequelize
  //   .sync({ force: true })
  .sync()
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);
