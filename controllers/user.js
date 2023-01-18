const User = require("../models/user");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const saltRound = 10;

// exports.createUser = async (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log(password);

//   await User.findAll({ where: { email } })
//     .then((ress) => {
//       if (ress.length > 0) {
//         res.json({ msg: "User already exists, Please Login" });
//       }
//       bcrypt.hash(password, saltRound, function (err, hash) {
//         User.create({
//           name: name,
//           email: email,
//           password: hash,
//         })
//           .then(() => {
//             res.json({
//               name: req.body.name,
//               email: req.body.email,

//               msg: "Successfuly signed up",
//             });
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "add all fields" });
    }
    const user = await User.findAll({ where: { email } });
    if (user.length > 0) {
      return res.status(207).json({ message: "user already exist" });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        console.log(err);
        await User.create({ name, email, password: hash });
        res.status(201).json({ message: "successfully created user" });
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    const user = await User.findAll({ where: { email } });

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, match) => {
        if (!match) {
          return res.status(207).json({ message: "password incorrect" });
        }
        return res.status(200).json({
          message: "login success",
          token: generateToken(user[0].id, user[0].name, user[0].ispremiumuser),
        });
      });
    } else {
      return res.status(207).json({ message: "Invalid Email " });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
function generateToken(id, name, ispremiumuser) {
  return jwt.sign({ userId: id, name: name, ispremiumuser }, "secretKey");
}

// function generateToken(id, name, ispremiumuser) {
//   return jwt.sign(
//     { userId: id, name: name, ispremiumuser: ispremiumuser },
//     process.env.TOKEN
//   );
// }
exports.getUsers = async (req, res, next) => {
  console.log("Getting users");
  try {
    const data = await User.findAll();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
exports.postAddUser = async (req, res, next) => {
  console.log("adding a user");
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    if (!phoneNo) {
      throw new Error("please enter phone number");
    }
    const data = await User.create({
      name: name,
      email: email,
      phoneNo: phoneNo,
    });
    res.status(201).json({ newUserDetail: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    if (!userId) {
      res.status(400).json({ error: "id missing" });
    }
    await User.destroy({ where: { id: userId } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json("error occured");
  }
};
