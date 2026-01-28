const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", auth, (req, res) => {
  const { month, limitAmount } = req.body;
  const { companyId } = req.user;

  db.get(
    "SELECT * FROM budgets WHERE company_id = ? AND month = ?",
    [companyId, month],
    (err, budget) => {
      if (budget) {
        db.run(
          "UPDATE budgets SET limit_amount = ? WHERE company_id = ? AND month = ?",
          [limitAmount, companyId, month],
          () => res.json({ message: "Budget updated" })
        );
      } else {
        db.run(
          "INSERT INTO budgets (company_id, month, limit_amount) VALUES (?, ?, ?)",
          [companyId, month, limitAmount],
          () => res.json({ message: "Budget created" })
        );
      }
    }
  );
});

module.exports = router;
