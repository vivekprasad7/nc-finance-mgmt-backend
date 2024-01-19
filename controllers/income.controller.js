const fs = require('fs')
const Income = require("../models/income.model.js");

const jsonData = fs.readFileSync('./data/income.json')
const incomeData = JSON.parse(jsonData)

const seedIncomeDB = async () => {
  try{
    for(const income of incomeData){
      const newIncome = new Income(income)
      await newIncome.save()
      console.log(`${newIncome.description} income seeded`)
    }
    console.log("Completed Seeding of Income DB")
    
  } catch(e){
    console.log("Error while seeding the DB", e)
  } finally {
    mongoose.disconnect()
  }
}



const getIncome = async () => {
  try {
    const incomeData = await Income.find();

    console.log("Income Data", incomeData);

    return incomeData;
  } catch (e) {
    console.error("Error while fetching income from DB", e);
  }
};

const addIncome = async (description, amount) => {
  try {
    const newIncome = new Income({ description, amount });
    const savedIncome = await newIncome.save()

    if (savedIncome) {
      console.log("Income Added Successfully", savedIncome);
      return savedIncome;
    } else {
      console.log("Error while adding Income to DB");
    }
  } catch (e) {
    console.error("Error While Adding Income to DB", e);
  }
};

module.exports = {
  getIncome,
  addIncome,
};
