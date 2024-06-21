import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const EditExam = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userToken = JSON.parse(localStorage.getItem("user_info")).token;
  const [exam, setExam] = useState({
    name: "",
    duration: "",
    started_at: "",
    expire_at: "",
    questions: [],
  });
  const [newQuestionVisible, setNewQuestionVisible] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    degree: "",
    answers: [
      { answer: "", is_correct: false },
      { answer: "", is_correct: false },
      { answer: "", is_correct: false },
      { answer: "", is_correct: false },
    ],
  });

  useEffect(() => {
    fetchExam();
  }, [id]);

  const fetchExam = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/exams/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setExam(response.data.data);
    } catch (error) {
      console.error("Error fetching exam:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExam({
      ...exam,
      [name]: value,
    });
  };

  const handleStartedAtChange = (date) => {
    setExam({
      ...exam,
      started_at: date.format("YYYY-MM-DD"),
    });
  };

  const handleExpireAtChange = (date) => {
    setExam({
      ...exam,
      expire_at: date.format("YYYY-MM-DD HH:mm"),
    });
  };

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value,
    });
  };

  const handleAnswerChange = (aIndex, e) => {
    const { name, value } = e.target;
    const newAnswers = [...newQuestion.answers];
    newAnswers[aIndex] = {
      ...newAnswers[aIndex],
      [name]: value,
    };
    setNewQuestion({
      ...newQuestion,
      answers: newAnswers,
    });
  };

  const handleCorrectAnswerChange = (aIndex) => {
    const newAnswers = newQuestion.answers.map((answer, index) => ({
      ...answer,
      is_correct: index === aIndex,
    }));
    setNewQuestion({
      ...newQuestion,
      answers: newAnswers,
    });
  };

  const addQuestion = async () => {
    try {
      const questionResponse = await axios.post(
        "http://127.0.0.1:8000/api/questions",
        {
          question: newQuestion.question,
          degree: newQuestion.degree,
          exam_id: id,
          answers: newQuestion.answers,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setExam({
        ...exam,
        questions: [...exam.questions, questionResponse.data],
      });

      setNewQuestion({
        question: "",
        degree: "",
        answers: [
          { answer: "", is_correct: false },
          { answer: "", is_correct: false },
          { answer: "", is_correct: false },
          { answer: "", is_correct: false },
        ],
      });

      setNewQuestionVisible(false);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/questions/${questionId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setExam({
        ...exam,
        questions: exam.questions.filter(
          (question) => question.id !== questionId
        ),
      });
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://127.0.0.1:8000/api/exams/${id}`, exam, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      navigate("/admin/ExamList");
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };

  return (
    <div>
      <h2>Edit Exam</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formExamName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              value={exam.name}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formExamDuration">
          <Form.Label column sm={2}>
            Duration (minutes)
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="time"
              name="duration"
              value={exam.duration}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formExamStartedAt">
          <Form.Label column sm={2}>
            Start Date
          </Form.Label>
          <Col sm={10}>
            <Datetime
              dateFormat="YYYY-MM-DD"
              timeFormat={false}
              value={moment(exam.started_at)}
              onChange={handleStartedAtChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formExamExpireAt">
          <Form.Label column sm={2}>
            Expire Date
          </Form.Label>
          <Col sm={10}>
            <Datetime
              dateFormat="YYYY-MM-DD HH:mm"
              value={moment(exam.expire_at)}
              onChange={handleExpireAtChange}
            />
          </Col>
        </Form.Group>
        <Button
          variant="primary"
          onClick={() => setNewQuestionVisible(!newQuestionVisible)}
        >
          {newQuestionVisible ? "Hide Add Question Form" : "Add New Question"}
        </Button>
        {newQuestionVisible && (
          <div>
            <Form.Group as={Row} controlId="formNewQuestion">
              <Form.Label column sm={2}>
                New Question
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="question"
                  value={newQuestion.question}
                  onChange={handleNewQuestionChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formNewQuestionDegree">
              <Form.Label column sm={2}>
                Degree
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  name="degree"
                  value={newQuestion.degree}
                  onChange={handleNewQuestionChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formNewQuestionAnswers">
              <Form.Label column sm={2}>
                Answers
              </Form.Label>
              <Col sm={10}>
                {newQuestion.answers.map((answer, aIndex) => (
                  <Row key={aIndex} className="mb-2">
                    <Col sm={6}>
                      <Form.Control
                        type="text"
                        name="answer"
                        placeholder={`Answer ${aIndex + 1}`}
                        value={answer.answer}
                        onChange={(e) => handleAnswerChange(aIndex, e)}
                      />
                    </Col>
                    <Col sm={4}>
                      <Form.Check
                        type="radio"
                        label="Correct"
                        name={`correctAnswer`}
                        checked={answer.is_correct}
                        onChange={() => handleCorrectAnswerChange(aIndex)}
                      />
                    </Col>
                  </Row>
                ))}
              </Col>
            </Form.Group>
            <Button variant="primary" onClick={addQuestion}>
              Add Question
            </Button>
          </div>
        )}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Degree</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exam.questions.map((question, index) => (
              <tr key={question.id}>
                <td>{index + 1}</td>
                <td>{question.question}</td>
                <td>{question.degree}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteQuestion(question.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success" type="submit">
          Update Exam
        </Button>
      </Form>
    </div>
  );
};

export default EditExam;
