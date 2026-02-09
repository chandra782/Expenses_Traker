const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", auth, (req, res) => {
  const { category, amount } = req.body;

  db.run(
    `INSERT INTO expenses (company_id, user_id, category, amount)
     VALUES (?, ?, ?, ?)`,
    [req.user.companyId, req.user.userId, category, amount],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Failed to add expense" });
      }
      res.json({ message: "Expense added successfully" });
    }
  );
});


router.get("/", auth, (req, res) => {
  db.all(
    "SELECT * FROM expenses WHERE company_id = ?",
    [req.user.companyId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch expenses" });
      }
      res.json(rows);
    }
  );
});

module.exports = router;
