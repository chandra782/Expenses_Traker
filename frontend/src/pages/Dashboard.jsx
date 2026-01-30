import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get("/expenses").then((res) => {
      const sum = res.data.reduce((a, b) => a + b.amount, 0);
      setTotal(sum);
    });
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Total Expenses: ₹{total}</p>
    </>
  );
};

export default Dashboard;
