const User = require("../models/user");

exports.createUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  await User.findAll({ where: { email } })
    .then((ress) => {
      if (ress.length > 0) {
        res.json({ msg: "User already exists, Please Login" });
      }

      User.create({
        name: name,
        email: email,
        password: password,
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
    })
    .catch((err) => {
      console.log(err);
    });
};
