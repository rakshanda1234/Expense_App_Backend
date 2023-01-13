const passwordController = require("../controllers/passwordController");

const middlewareAuthentication = require("../middleware/auth");

const express = require("express");

const router = express.Router();

router.post(
  "/forgotpassword",
  middlewareAuthentication.authentication,
  passwordController.Forgotpassword
);

module.exports = router;
