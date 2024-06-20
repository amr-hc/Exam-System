import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchExams } from "../../api";
import { FaFileAlt } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ExamList = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div>
      <h2>Exams</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="d-flex flex-wrap">
          {exams.map((exam) => (
            <div key={exam.id} className="exam-card">
              <div className="card-body">
                <FaFileAlt className="fs-1 my-2" />
                <h5 className="card-title lead my-2">{exam.name}</h5>
                <p className="card-text text-muted small">
                  Expires at: {exam.expireAt}
                </p>
                <div className="badge bg-info">{exam.duration}</div>
                <Button
                  onClick={() => handleStartExam(exam.id)}
                  disabled={new Date() > new Date(exam.expireAt)}
                  variant="primary"
                >
                  Start Exam
                </Button>
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
