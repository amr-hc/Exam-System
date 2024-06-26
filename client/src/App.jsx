import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ExamList from "./components/Exam/ExamList";
import TakeExam from "./components/Exam/ExamPage";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AuthForm from "./components/Auth/AuthForm";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AdminRoute from "./components/Auth/AdminRoute";
const App = () => {
  const location = useLocation();

  const noHeaderPaths = ["/", "/login", "/register"];

  return (
    <div>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/exams" element={<ExamList />} />
            <Route path="/exams/:id" element={<TakeExam />} />
            <Route path="/results" element={<Results />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
