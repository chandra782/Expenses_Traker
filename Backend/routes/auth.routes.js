const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ message: "DB error" });
      }

      if (!user) {
        return res.status(400).json({ message: "INVALID CREDENTIALS" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "INVALID CREDENTIALS" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          companyId: user.company_id,
          role: user.role,
        },
        "SECRET-KEY",
        { expiresIn: "1d" }
      );

      res.json({ token });
    }
  );
});

module.exports = router;
