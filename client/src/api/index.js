const dummyExams = [
  {
    id: 1,
    name: "Sample Exam 1",
    duration: "2 hours",
    expireAt: "2024-06-30",
  },
  {
    id: 2,
    name: "Sample Exam 2",
    duration: "1.5 hours",
    expireAt: "2024-07-05",
  },
];

const dummyExamDetails = {
  id: 1,
  name: "Sample Exam 1",
  duration: "2 hours",
  expireAt: "2024-06-30",
  questions: [
    {
      id: 1,
      question: "Sample Question 1",
      options: ["Option 1", "Option 2", "Option 3"],
      correctOption: 1,
    },
    {
      id: 2,
      question: "Sample Question 2",
      options: ["Option A", "Option B", "Option C"],
      correctOption: 0,
    },
  ],
};

const dummyResults = [
  {
    id: 1,
    examId: 1,
    score: 80,
    status: "Pass",
  },
  {
    id: 2,
    examId: 2,
    score: 60,
    status: "Fail",
  },
  // Add more result objects as needed
];

export const login = async (credentials) => {
  // Simulate login API call
  return { token: "mockToken" };
};

export const register = async (userData) => {
  // Simulate register API call
  return { message: "User registered successfully" };
};

export const fetchExams = async () => {
  // Simulate fetching exams
  return dummyExams;
};

export const fetchExamDetails = async (examId) => {
  // Simulate fetching exam details
  return dummyExamDetails;
};

export const submitExam = async (examId, answers) => {
  // Simulate submitting exam
  // You can add actual logic here if needed
  return { message: "Exam submitted successfully" };
};

export const fetchResults = async () => {
  // Simulate fetching results
  return dummyResults;
};

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api",
// });

// export const login = async (credentials) => {
//   const response = await api.post("/login", credentials);
//   return response.data;
// };

// export const register = async (userData) => {
//   const response = await api.post("/register", userData);
//   return response.data;
// };

// export const fetchExams = async () => {
//   const response = await api.get("/exams");
//   return response.data;
// };

// export const fetchExamDetails = async (examId) => {
//   const response = await api.get(`/exams/${examId}`);
//   return response.data;
// };

// export const submitExam = async (examId, answers) => {
//   const response = await api.post(`/exams/${examId}/submit`, { answers });
//   return response.data;
// };

// export const fetchResults = async () => {
//   const response = await api.get("/results");
//   return response.data;
// };

// export default api;
