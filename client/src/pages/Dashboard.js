import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchBorrowed = async () => {
      const res = await API.get("/borrow");
      setCount(res.data.length);
    };

    fetchBorrowed();
  }, []);

  return (
    <div className="page dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-card">
        <h3>Books Borrowed</h3>
        <p>{count}</p>
      </div>
    </div>
  );
}

export default Dashboard;