import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exams: [],
  currentExam: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setExams(state, action) {
      state.exams = action.payload;
    },
    setCurrentExam(state, action) {
      state.currentExam = action.payload;
    },
  },
});

export const { setExams, setCurrentExam } = examSlice.actions;

export default examSlice.reducer;
