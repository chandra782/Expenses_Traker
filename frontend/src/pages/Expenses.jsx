import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "./Expenses.css";

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
    await api.post("/expenses", {
      category: category.trim(),
      amount: Number(amount),
    });
    setCategory("");
    setAmount("");
    loadExpenses();
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Expenses</h1>

        <form className="expense-form" onSubmit={addExpense}>
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button>Add Expense</button>
        </form>

        <table className="expense-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="2" className="empty">
                  No expenses recorded
                </td>
              </tr>
            ) : (
              expenses.map((e) => (
                <tr key={e.id}>
                  <td>{e.category}</td>
                  <td>₹ {e.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Expenses;
