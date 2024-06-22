import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import CreateExam from "./CreateExam";
import ExamList from "./ExamList";
import EditExam from "./EditExam";
import ExamDetails from "./ExamDetails";
import ResultComponent from "./Result";
import { FaHome, FaList } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";

const AdminDashboard = () => {
  const sidebarItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    // { name: "Exams", path: "/admin/exams", icon: <FaList /> },
    { name: "New Exam", path: "/admin/new-exam", icon: <MdOutlinePostAdd /> },
    { name: "Exam List", path: "/admin/ExamList", icon: <FaList /> },
  ];

  return (
    <div className="d-flex">
      <Sidebar items={sidebarItems} />
      <div className="content h-auto">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <h6 className="text-center lead">Welcome to the Dashboard</h6>
            }
          />
          {/* <Route path="exams" element={<Exams />} /> */}
          <Route path="new-exam" element={<CreateExam />} />
          <Route path="examList" element={<ExamList />} />
          <Route path="/edit-exam/:id" element={<EditExam />} />
          <Route path="/exam/:id" element={<ExamDetails />} />
          <Route path="/exam/:id/result" element={<ResultComponent />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
