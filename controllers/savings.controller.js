const fs = require("fs");
const Savings = require("../models/savings.model.js");

const jsonData = fs.readFileSync("./data/savings.json");
const savingsData = JSON.parse(jsonData);

const seedSavingsToDB = async () => {
  try {
    for (const saving of savingsData) {
      const newSaving = await new Savings(saving);
      await newSaving.save();
      console.log(`${newSaving.description} seeded`);
    }

    console.log("Finished Seeding of Savings DB");
  } catch (e) {
    console.log("Error while seeding the Savings DB", e);
  } finally {
    mongoose.disconnect();
  }
};

const getSavings = async () => {
  try {
    const allSavings = await Savings.find();

    console.log("All Savings", allSavings);
    return allSavings;
  } catch (e) {
    console.error("Error while fetching savings from DB", e);
  }
};

const addSaving = async (savingToBeAdded) => {
  try {
    const newSaving = new Savings(savingToBeAdded);

    const savedIncome = await newSaving.save();

    if (savedIncome) {
      console.log("New Saving Added", savedIncome);
      return savedIncome;
    } else {
      console.log("Error while Adding New Savings Data");
    }
  } catch (e) {
    console.error("Error while Adding Savings Data", e);
  }
};

module.exports = {
  getSavings,
  addSaving,
};
