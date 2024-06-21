import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import Exams from "../../components/Exam/ExamList";
import CreateExam from "./CreateExam";
import ExamList from "./ExamList";
import EditExam from "./EditExam";
import ResultComponent from "./ResultComponent";
import { FaHome, FaList, FaChartBar } from "react-icons/fa";

const AdminDashboard = () => {
  const sidebarItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    { name: "Exams", path: "/admin/exams", icon: <FaList /> },
    { name: "new ", path: "/admin/new-exam", icon: <FaList /> },
    { name: "examList", path: "/admin/ExamList", icon: <FaList /> },
    { name: "Results", path: "/admin/dashboard/results", icon: <FaChartBar /> },
  ];

  return (
    <div className="d-flex">
      <Sidebar items={sidebarItems} />
      <div className="content">
        <Routes>
          <Route path="/admin/dashboard/" element={<h1>Welcome to the Dashboardc</h1>} />
          <Route path="exams" element={<Exams />} />
          <Route path="new-exam" element={<CreateExam />} />
          <Route path="examList" element={<ExamList />} />
          <Route path="/edit-exam/:id" element={<EditExam />} />
          <Route path="/exam/:id/result" element={<ResultComponent />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
