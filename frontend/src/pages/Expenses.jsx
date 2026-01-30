import { useEffect, useState } from "react";
import api from "../api/axios";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const loadExpenses = async () => {
    const res = await api.get("/expenses");
    setExpenses(res.data);
  };

  const addExpense = async (e) => {
    e.preventDefault();
    await api.post("/expenses", { category, amount });
    setCategory("");
    setAmount("");
    loadExpenses();
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <>
      <h1>Expenses</h1>

      <form onSubmit={addExpense}>
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button>Add</button>
      </form>

      <ul>
        {expenses.map((e) => (
          <li key={e.id}>{e.category} - ₹{e.amount}</li>
        ))}
      </ul>
    </>
  );
};

export default Expenses;
