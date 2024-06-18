import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ExamList from "./components/Exam/ExamList";
import TakeExam from "./components/Exam/TakeExam";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exams" element={<ExamList />} />
          <Route path="/exams/:id" element={<TakeExam />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
