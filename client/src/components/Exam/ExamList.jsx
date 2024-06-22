import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchExams, fetchResults } from "../../api";
import { FaFileAlt } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const ExamList = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResults = async () => {
      try {
        const data = await fetchResults();
        setResults(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getResults();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const examsData = await fetchExams();
        setExams(examsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exams:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleStartExam = (examId) => {
    setSelectedExamId(examId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedExamId(null);
    setIsModalOpen(false);
  };

  const handleConfirmExam = () => {
    navigate(`/exams/${selectedExamId}`);
  };

  const getExamResult = (examId) => {
    return results.find((result) => result.id === examId);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
  return (
    <div>
      <h2>Exams</h2>
      {loading ? (
        <Spinner animation="grow" />
      ) : (
        <div className="d-flex flex-wrap">
          {exams.map((exam) => (
            <div key={exam.id} className="exam-card">
              <div className="card-body">
                <FaFileAlt className="fs-1 my-2" />
                <h5 className="card-title lead my-2">{exam.name}</h5>
                <p className="card-text text-muted small">
                  Expires at: {formatDate(exam.expire_at)}
                </p>
                <div className="badge bg-info">{exam.duration}</div>
                {getExamResult(exam.id) ? (
                  <div className="text-success">
                    Score: {getExamResult(exam.id).score}
                  </div>
                ) : (
                  <Button
                    onClick={() => handleStartExam(exam.id)}
                    disabled={new Date() > new Date(exam.expire_at)}
                    variant="primary"
                  >
                    Start Exam
                  </Button>
                )}
              </div>
              <Modal
                show={selectedExamId === exam.id}
                onHide={handleCloseModal}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Start Exam</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to start the exam: {exam.name}?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleConfirmExam}>
                    Start
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamList;
