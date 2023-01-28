const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authentication = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.group(token);
    const user = jwt.verify(token, "secretKey");
    console.log("userId>>>", user.userId);
    User.findByPk(user.userId)
      .then((user) => {
        // console.log(JSON.stringify(user));
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authentication,
};
