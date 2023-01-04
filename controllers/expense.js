const Expense = require("../models/expenses");

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
  const { expenseamount, description, category } = req.body;
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
