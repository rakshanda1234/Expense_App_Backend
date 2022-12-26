const User = require("../models/user");
const bcrypt = require("bcrypt");

const saltRound = 10;

exports.createUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  console.log(password);

  await User.findAll({ where: { email } })
    .then((ress) => {
      if (ress.length > 0) {
        res.json({ msg: "User already exists, Please Login" });
      }
      bcrypt.hash(password, saltRound, function (err, hash) {
        User.create({
          name: name,
          email: email,
          password: hash,
        })
          .then(() => {
            res.json({
              name: req.body.name,
              email: req.body.email,

              msg: "Successfuly signed up",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findAll({ where: { email } })
    .then((user) => {
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (err) {
            throw new Error("Something went wrong");
          }

          if (result === true) {
            res
              .status(200)
              .json({ success: true, message: "User logged in successfully" });
          } else {
            return res
              .status(400)
              .json({ success: false, message: "Password is incorrect" });
          }
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "User Does not Exist" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
