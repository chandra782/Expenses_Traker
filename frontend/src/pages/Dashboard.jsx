import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const [total, setTotal] = useState(0);
  const [expenseCount, setExpenseCount] = useState(0);

  useEffect(() => {
    api.get("/expenses").then((res) => {
      const sum = res.data.reduce((a, b) => a + b.amount, 0);
      setTotal(sum);
      setExpenseCount(res.data.length);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Dashboard</h1>
        <p className="subtitle">Company expense overview</p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Expenses</h3>
            <p className="amount">₹ {total}</p>
          </div>

          <div className="stat-card">
            <h3>Total Records</h3>
            <p className="amount">{expenseCount}</p>
          </div>

          <div className="stat-card">
            <h3>Status</h3>
            <p className="amount success">On Track</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
