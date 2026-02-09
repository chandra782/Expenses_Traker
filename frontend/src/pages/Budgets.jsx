import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "./Budgets.css";

const Budgets = () => {
  const [month, setMonth] = useState("");
  const [limit, setLimit] = useState("");
  const [budgets, setBudgets] = useState([]);

  const loadBudgets = async () => {
    const res = await api.get("/budgets");
    setBudgets(res.data);
  };

  const addBudget = async (e) => {
    e.preventDefault();
    await api.post("/budgets", {
      month: month.trim(),
      limit_amount: Number(limit),
    });
    setMonth("");
    setLimit("");
    loadBudgets();
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Budgets</h1>

        <div className="budget-container">
          <form className="budget-form" onSubmit={addBudget}>
            <h3>Add Monthly Budget</h3>

            <input
              placeholder="Month (YYYY-MM)"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Limit Amount"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              required
            />

            <button>Add Budget</button>
          </form>

          <div className="budget-list">
            <h3>Existing Budgets</h3>

            {budgets.length === 0 ? (
              <p className="empty">No budgets added yet</p>
            ) : (
              <ul>
                {budgets.map((b) => (
                  <li key={b.id}>
                    <span>{b.month}</span>
                    <span>₹ {b.limit_amount}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Budgets;
