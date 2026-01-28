const express = require("express");

const authRoutes = require("./routes/auth.routes");
const companyRoutes = require("./routes/company.routes");
const expenseRoutes = require("./routes/expense.routes");
const budgetRoutes = require("./routes/budget.routes");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Backend is running");
});

app.use("/auth", authRoutes);
app.use("/company", companyRoutes);
app.use("/expenses", expenseRoutes);
app.use("/budgets", budgetRoutes);

module.exports = app;
