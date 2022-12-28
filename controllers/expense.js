const Expense = require("../models/expenses");

const addexpense = async (req, res, next) => {
  try {
    const expenseamount = req.body.expenseamount;
    const description = req.body.description;
    const category = req.body.category;

    const data = await Expense.create({
      expenseamount: expenseamount,
      description: description,
      category: category,
    });

    res.status(200).json({ newExpenseDetail: data });
  } catch (err) {
    console.log("check", err);
    res.status(500).json({
      error: err,
    });
  }
};

const getexpense = (req, res) => {
  Expense.findAll()
    .then((expense) => {
      return res.status(200).json({ expense, success: true });
    })
    .catch((err) => {
      return res.status(500).json({ error: err, success: false });
    });
};

const deleteexpense = async (req, res) => {
  try {
    const eid = req.params.expenseid;
    await Expense.destroy({ where: { Id: eid } });
    return res.status(200);
  } catch (err) {
    console.log("delete", err);
    res.status(500).json(err);
  }
};

module.exports = {
  deleteexpense,
  getexpense,
  addexpense,
};
