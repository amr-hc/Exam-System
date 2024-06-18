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
  return response.data;
};

export const fetchExamDetails = async (examId) => {
  const response = await api.get(`/exams/${examId}`);
  return response.data;
};

export const submitExam = async (examId, answers) => {
  const response = await api.post(`/exams/${examId}/submit`, { answers });
  return response.data;
};

export const fetchResults = async () => {
  const response = await api.get("/results");
  return response.data;
};

export default api;
