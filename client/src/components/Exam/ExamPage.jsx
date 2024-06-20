import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchExamDetails } from "../../api";

const ExamPage = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExam() {
      try {
        const examData = await fetchExamDetails(id);
        setExam(examData);
        console.log(examData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam details:", error);
        setLoading(false);
      }
    }

    fetchExam();
  }, [id]);

  if (loading) {
    return <p>Loading exam...</p>;
  }

  if (!exam) {
    return <p>Exam not found.</p>;
  }

  return (
    <div>
      <h2>{exam.name}</h2>
      {/* Render exam questions and form here */}
    </div>
  );
};

export default ExamPage;
