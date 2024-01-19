const express = require('express')

const expensesRouter = express.Router()

const {
  getExpenses,
  addExpense
} = require("../controllers/expenses.controller")

expensesRouter.get('/', async(req, res) => {
  try{
    const allExpenses = await getExpenses()

    res.status(200).json({ message:"Expenses fetched Successfully", expenses: allExpenses})
    
  } catch(e){
    res.status(500).json({error: "Failure Retrieving Expenses Data"})
  }
})


expensesRouter.post('/', async(req, res) => {
  try{
    const newExpense = await addExpense(req.body)

    if(newExpense){
      res.status(201).json({message:"Expense Added Successfully", expense : newExpense})
    } else {
      res.status(404).json({error: "Failed to add Expense"})
    }
    
    
  } catch(e){
    res.status(500).json({error:"Failure to add expense"})
  }
})


module.exports = expensesRouter