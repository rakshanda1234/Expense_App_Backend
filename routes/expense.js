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

router.get(
  "/getInfo/:loadUserId",
  middlewareAuthentication.authentication,
  expenseController.getLeaderBoardUser
);

router.get(
  "/download",
  middlewareAuthentication.authentication,
  expenseController.downloadExpense
);

router.get(
  "/getAllUrl",
  middlewareAuthentication.authentication,
  expenseController.downloadAllUrl
);

module.exports = router;
