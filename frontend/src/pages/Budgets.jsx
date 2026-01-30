import { useEffect, useState } from "react";
import api from "../api/axios";

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
    await api.post("/budgets", { month, limit_amount: limit });
    setMonth("");
    setLimit("");
    loadBudgets();
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  return (
    <>
      <h1>Budgets</h1>

      <form onSubmit={addBudget}>
        <input placeholder="Month (2026-01)" value={month} onChange={(e) => setMonth(e.target.value)} />
        <input placeholder="Limit" value={limit} onChange={(e) => setLimit(e.target.value)} />
        <button>Add</button>
      </form>

      <ul>
        {budgets.map((b) => (
          <li key={b.id}>{b.month} - ₹{b.limit_amount}</li>
        ))}
      </ul>
    </>
  );
};

export default Budgets;
