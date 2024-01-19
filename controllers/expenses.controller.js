const fs = require("fs");
const Expenses = require("../models/expenses.model.js");

const jsonData = fs.readFileSync("./data/expenses.json");
const expensesData = JSON.parse(jsonData);

const seedExpensesToDB = async () => {
  try {
    for (const expense of expensesData) {
      const newExpense = await new Expenses(expense);
      await newExpense.save();
      console.log(`${newExpense.description} seeded`);
    }
    console.log("Completed Seeding of Expenses Database");
  } catch (e) {
    console.log("Error while seeding Expenses to DB");
  } finally {
    mongoose.disconnect();
  }
};

const getExpenses = async () => {
  try {
    const allExpenses = await Expenses.find();

    console.log("All Expenses", allExpenses);

    return allExpenses;
  } catch (e) {
    console.error("Error while fetching expenses from DB", e);
  }
};

const addExpense = async (newExpense) => {
  try {
    const expenseAdded = await new Expenses(newExpense);

    const savedExpense = await expenseAdded.save();

    if (savedExpense) {
      console.log("Expense Added", savedExpense);
      return savedExpense;
    } else {
      console.error("Error while Adding New Expense");
    }
  } catch (e) {
    console.error("Error While Adding Expense", e);
  }
};

module.exports = {
  getExpenses,
  addExpense,
};
