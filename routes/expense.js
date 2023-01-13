const express = require("express");

const expenseController = require("../controllers/expense");

const middlewareAuthentication = require("../middleware/auth");

const router = express.Router();

const userAuthentication = require("../middleware/auth");

router.post(
  "/addExpense",
  userAuthentication.authentication,
  expenseController.addExpense
);

router.get(
  "/getExpenses",
  userAuthentication.authentication,
  expenseController.getExpenses
);

router.delete(
  "/deleteExpense/:userId",
  userAuthentication.authentication,
  expenseController.deleteExpense
);

router.get(
  "/premiums",
  middlewareAuthentication.authentication,
  expenseController.getAllUsers
);

module.exports = router;
