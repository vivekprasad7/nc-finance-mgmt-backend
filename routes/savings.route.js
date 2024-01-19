const express = require("express");

const {
  getSavings,
  addSaving,
} = require("../controllers/savings.controller.js");

const savingsRouter = express.Router();

savingsRouter.get("/", async (req, res) => {
  try {
    const allSavings = await getSavings();

    res.status(201).json({
      message: "Savings Retrieved Successfuly from the DB",
      savings: allSavings,
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to retrieve savings from DB" });
  }
});

savingsRouter.post("/", async (req, res) => {
  try {
    const { description, amount, category } = req.body;

    const savingAdded = await addSaving(description, amount, category);

    if (savingAdded) {
      res.status(200).json({ message: "Saving added successfully" });
    } else {
      res.status(404).json({ message: "Unable to add savings to DB" });
    }
  } catch (e) {
    res.status(500).json({ message: "Failed to Save Savings to DB" });
  }
});

module.exports = savingsRouter;
