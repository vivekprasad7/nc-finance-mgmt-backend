const dotenv = require("dotenv")
dotenv.config({
    path:'./.env'
})
require("./db/db.connect");
require("./db/db.connect.js");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 5000;

const incomeRouter = require("./routes/income.route.js");
const expensesRouter = require("./routes/expenses.route.js");
const savingsRouter = require("./routes/savings.route.js");

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/income", incomeRouter);
app.use("/expenses", expensesRouter);
app.use("/savings", savingsRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(`${PORT}`, () => {
  console.log(`Server is running on port: ${PORT}`);
});
