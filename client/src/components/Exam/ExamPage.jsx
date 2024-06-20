import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchExamDetails, submitExamAnswers } from "../../api";
import Pagination from "../UI/Pagination";
import ToastComponent from "../UI/Toast"; // Import the ToastComponent here
import Spinner from "react-bootstrap/Spinner";

const ExamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [showToast, setShowToast] = useState(false); // Add state for showing the toast

  useEffect(() => {
    async function fetchExam() {
      try {
        const examData = await fetchExamDetails(id);
        setExam(examData);

        const [hours, minutes] = examData.duration.split(":").map(Number);
        setTimeRemaining(hours * 3600 + minutes * 60);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam details:", error);
        setLoading(false);
      }
    }

    fetchExam();
  }, [id]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeRemaining]);

  const handlePageChange = (pageIndex) => {
    setCurrentQuestionIndex(pageIndex);
  };

  const handleAnswerSelect = (questionId, answerId) => {
    if (examFinished) return; // Prevent interaction if exam is finished

    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  const handleSubmit = async () => {
    try {
      if (Object.keys(selectedAnswers).length !== exam.questions.length) {
        setShowToast(true);
        return;
      }
      if (timeRemaining <= 0) {
        console.log("Time expired, submitting automatically...");
      }
      const response = await submitExamAnswers(id, selectedAnswers); // Adjust this call to match your API
      console.log("Exam submitted successfully:", response);
      setExamFinished(true);
      // Optionally redirect to a results page
      // navigate(`/exam/${id}/result`);
    } catch (error) {
      console.error("Error submitting exam answers:", error);
      // Handle submission error (e.g., show a message to the user)
    }
  };

  if (loading) {
    return <Spinner animation="grow" />;
  }

  if (!exam) {
    return <p>No exam found.</p>;
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progressValue =
    ((currentQuestionIndex + 1) / exam.questions.length) * 100;
  const selectedAnswer = selectedAnswers[currentQuestion.id];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (examFinished) {
    return <h2>Exam Finished</h2>;
  }

  return (
    <div className="container py-4">
      <h2>{exam.name}</h2>
      <div className="d-flex">
        <h6 className="me-auto">Time Remaining: {formatTime(timeRemaining)}</h6>
      </div>

      <div className="my-3">
        <progress
          className="custom-progress"
          style={{ height: "10px" }}
          value={progressValue}
          max="100"
        />
      </div>

      <div>
        <h4>{currentQuestion.question}</h4>
        <div className="options">
          {currentQuestion.answers.map((option, index) => (
            <div
              key={index}
              className={`option ${
                selectedAnswer === option.id ? "selected" : ""
              }`}
              onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
            >
              {index + 1}. {option.answer}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination-bottom">
        <Pagination
          currentPage={currentQuestionIndex}
          totalPages={exam.questions.length}
          onPageChange={handlePageChange}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit Exam
      </button>
      {showToast && (
        <div className="my-5 position-fixed top-0 end-0 p-3 position-absolute">
          <ToastComponent
            title="Error"
            message="Please answer all questions."
          />
        </div>
      )}
    </div>
  );
};

export default ExamPage;
