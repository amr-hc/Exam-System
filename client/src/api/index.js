import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const fetchExams = async () => {
  const response = await api.get("/exams");
  return response.data.data;
};

export const fetchExamDetails = async (examId) => {
  const response = await api.get(`/exams/${examId}`);
  return response.data.data;
};

export const submitExamAnswers = async (examId, answers) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const formattedAnswers = {
    answers: Object.keys(answers).map((questionId) => ({
      answer_id: answers[questionId],
    })),
  };

  try {
    const response = await api.post("/assignanswers", formattedAnswers, config);
    console.log("Full response:", response); // Log the full response for debugging
    return response.data.data;
  } catch (error) {
    console.error("Error submitting exam answers:", error.response || error);
    throw error;
  }
};

export const fetchResults = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get("/exam_student/mine", config);
  return response.data.data;
};

export default api;
