const forgotpasswordController = require("../controllers/forgotpassword");

const express = require("express");

const router = express.Router();

// router.get(
//   "/updatepassword/:resetpasswordid",
//   resetpasswordController.updatepassword
// );

// router.get("/resetpassword/:id", resetpasswordController.resetpassword);

// // router.post(
// //   "/forgotpassword",
// //   middlewareAuthentication.authentication,
// //   passwordController.Forgotpassword
// // );

// router.use("/forgotpassword", resetpasswordController.forgotpassword);

router.use("/forgotpassword", forgotpasswordController.getForgotpassword);
router.get("/resetpassword/:id", forgotpasswordController.getResetpassword);
router.get(
  "/updatepassword/:resetpasswordid",
  forgotpasswordController.getUpdatepassword
);

module.exports = router;
