const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const companyRoutes = require("./routes/company.routes");
const expenseRoutes = require("./routes/expense.routes");
const budgetRoutes = require("./routes/budget.routes");

const app = express();


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());


app.get("/health", (req, res) => {
  res.send("Backend is running");
});

app.use("/auth", authRoutes);
app.use("/company", companyRoutes);
app.use("/expenses", expenseRoutes);
app.use("/budgets", budgetRoutes);

module.exports = app;
