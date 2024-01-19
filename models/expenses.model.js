const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Grocery", "Bills", "Shopping", "Travel"],
      required: true,
    },
  },
  { timestamps: true },
);

const Expenses = mongoose.model("Expenses", expensesSchema);

module.exports = Expenses;
