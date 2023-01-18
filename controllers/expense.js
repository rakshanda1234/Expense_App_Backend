const Expense = require("../models/expenses");
const User = require("../models/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    if (req.user.ispremiumuser) {
      console.log("into getall Users");
      let leaderboard = [];
      let users = await User.findAll({ attributes: ["id", "name", "email"] });
      console.log(users);

      for (let i = 0; i < users.length; i++) {
        let expenses = await users[i].getExpenses();

        console.log(users[i]);
        console.log(expenses);
        let totalExpense = 0;
        for (let j = 0; j < expenses.length; j++) {
          totalExpense += expenses[j].expenseamount;
        }
        console.log(totalExpense);
        let userObj = {
          user: users[i],
          expenses,
          totalExpense,
        };
        leaderboard.push(userObj);
      }
      return res.status(200).json({ success: true, data: leaderboard });
    }

    return res.status(400).json({ message: "user is not premium user" });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

exports.getLeaderBoardUser = async (req, res, next) => {
  try {
    if (req.user.ispremiumuser) {
      const userId = req.params.loadUserId;
      const user = await User.findOne({ where: { id: userId } });

      const expenses = await user.getExpenses();
      return res.status(200).json({ success: true, data: expenses });
    }
  } catch (error) {
    return res.status(500).json({ success: false, data: error });
  }
};

exports.addExpense = async (req, res, next) => {
  const { expenseamount, description, category } = req.body;
  try {
    if (!expenseamount || !description || !category) {
      return res.status(400).json({ message: "no fields can be empty" });
    }
    const data = await req.user.createExpense({
      expenseamount,
      description,
      category,
    });

    res.status(201).json({ newExpenseDetail: data });
  } catch (err) {
    console.log("check", err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.getExpenses = async (req, res, next) => {
  // const { expenseamount, description, category } = req.body;
  try {
    let data = await req.user.getExpenses();
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      res.status(400).json({ error: "id missing" });
    }

    // await Expense.destroy({ where: { Id: eid } });
    // return res.status(200);

    await req.user.getExpenses({ where: { id: userId } }).then((expense) => {
      let findExpenses = expense[0];
      findExpenses.destroy();
      res.status(200);
    });
  } catch (err) {
    console.log("delete", err);
    res.status(500).json(err);
  }
};

// module.exports = {
//   deleteExpense,
//   getExpenses,
//   addExpense,
// };
