const express = require("express");

const incomeRouter = express.Router();

const { getIncome, addIncome } = require("../controllers/income.controller.js");

incomeRouter.get("/", async (req, res) => {
  try {
    const allIncome = await getIncome();

    res
      .status(201)
      .json({ message: "Income fetched Successfully", income: allIncome });
  } catch (e) {
    res.status(500).json("Failed to Fetch Income From DB");
  }
});

incomeRouter.post("/", async (req, res) => {
  try {
    const { description, amount } = req.body;

    const addedIncome = await addIncome(description, amount);

    if (addedIncome) {
      res.status(200).json({ message: "Income added Successfully" });
    } else {
      res.status(404).json({ message: "Unable to add Income" });
    }
  } catch (e) {
    res.status(500).json({ message: "Failed to add Income to DB" });
  }
});

module.exports = incomeRouter;
