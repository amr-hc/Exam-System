import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import Exams from "../components/Exam/ExamList";
import Results from "./Results";
import { FaHome, FaList, FaChartBar } from "react-icons/fa";

const Dashboard = () => {
  const sidebarItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Exams", path: "/dashboard/exams", icon: <FaList /> },
    { name: "Results", path: "/dashboard/results", icon: <FaChartBar /> },
  ];

  return (
    <div className="d-flex">
      <Sidebar items={sidebarItems} />
      <div className="content h-auto">
        <Routes>
          <Route path="/" element={<h1>Welcome to the Dashboard</h1>} />
          <Route path="exams" element={<Exams />} />
          <Route path="results" element={<Results />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
