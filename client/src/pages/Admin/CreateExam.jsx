import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const CreateExam = () => {
    const [exam, setExam] = useState({
        name: '',
        duration: '',
        started_at: '',
        expire_at: '',
        questions: [
            {
                question: '',
                degree: '',
                answers: [
                    { answer: '', is_correct: false },
                    { answer: '', is_correct: false },
                    { answer: '', is_correct: false },
                    { answer: '', is_correct: false }
                ]
            }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExam({
            ...exam,
            [name]: value
        });
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const newQuestions = [...exam.questions];
        newQuestions[index] = {
            ...newQuestions[index],
            [name]: value
        };
        setExam({
            ...exam,
            questions: newQuestions
        });
    };

    const handleDegreeChange = (index, e) => {
        const { value } = e.target;
        const degree = Math.min(Math.max(value, 0), 100); // Ensuring the degree is between 0 and 100
        const newQuestions = [...exam.questions];
        newQuestions[index] = {
            ...newQuestions[index],
            degree
        };
        setExam({
            ...exam,
            questions: newQuestions
        });
    };

    const handleAnswerChange = (qIndex, aIndex, e) => {
        const { name, value } = e.target;
        const newAnswers = [...exam.questions[qIndex].answers];
        newAnswers[aIndex] = {
            ...newAnswers[aIndex],
            [name]: value
        };
        const newQuestions = [...exam.questions];
        newQuestions[qIndex].answers = newAnswers;
        setExam({
            ...exam,
            questions: newQuestions
        });
    };

    const handleCorrectAnswerChange = (qIndex, aIndex) => {
        const newQuestions = [...exam.questions];
        newQuestions[qIndex].answers = newQuestions[qIndex].answers.map((answer, index) => ({
            ...answer,
            is_correct: index === aIndex
        }));
        setExam({
            ...exam,
            questions: newQuestions
        });
    };

    const addQuestion = () => {
        setExam({
            ...exam,
            questions: [...exam.questions, { question: '', degree: '', answers: [
                { answer: '', is_correct: false },
                { answer: '', is_correct: false },
                { answer: '', is_correct: false },
                { answer: '', is_correct: false }
            ] }]
        });
    };

    const removeQuestion = (qIndex) => {
        const newQuestions = [...exam.questions];
        newQuestions.splice(qIndex, 1);
        setExam({
            ...exam,
            questions: newQuestions
        });
    };

    const handleStartedAtChange = (date) => {
        setExam({
            ...exam,
            started_at: date.format('YYYY-MM-DD')
        });
    };

    const handleExpireAtChange = (date) => {
        setExam({
            ...exam,
            expire_at: date.format('YYYY-MM-DD HH:mm')
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedExam = {
            ...exam,
            duration: `${Math.floor(exam.duration / 60)}:${('0' + (exam.duration % 60)).slice(-2)}`
        };
        axios.post('http://127.0.0.1:8000/api/exams', formattedExam)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error creating the exam!', error);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formExamName">
                <Form.Label column sm={2}>Name</Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" name="name" value={exam.name} onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formExamDuration">
                <Form.Label column sm={2}>Duration (minutes)</Form.Label>
                <Col sm={10}>
                    <Form.Control type="number" name="duration" value={exam.duration} onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formExamStartedAt">
                <Form.Label column sm={2}>Start Date</Form.Label>
                <Col sm={10}>
                    <Datetime
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        onChange={handleStartedAtChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formExamExpireAt">
                <Form.Label column sm={2}>Expire Date</Form.Label>
                <Col sm={10}>
                    <Datetime
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        onChange={handleExpireAtChange}
                    />
                </Col>
            </Form.Group>
            {exam.questions.map((question, qIndex) => (
                <div key={qIndex}>
                    <Form.Group as={Row} controlId={`formQuestion${qIndex}`}>
                        <Form.Label column sm={2}>Question</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="question" value={question.question} onChange={(e) => handleQuestionChange(qIndex, e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={`formDegree${qIndex}`}>
                        <Form.Label column sm={2}>Degree</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="number" name="degree" max="100" value={question.degree} onChange={(e) => handleDegreeChange(qIndex, e)} />
                        </Col>
                    </Form.Group>
                    {question.answers.map((answer, aIndex) => (
                        <Form.Group as={Row} key={aIndex} controlId={`formAnswer${qIndex}-${aIndex}`}>
                            <Form.Label column sm={2}>Answer {aIndex + 1}</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="text" name="answer" value={answer.answer} onChange={(e) => handleAnswerChange(qIndex, aIndex, e)} />
                            </Col>
                            <Col sm={3}>
                                <Form.Check 
                                    type="radio" 
                                    label="Correct" 
                                    name={`is_correct_${qIndex}`} 
                                    checked={answer.is_correct} 
                                    onChange={() => handleCorrectAnswerChange(qIndex, aIndex)} 
                                />
                            </Col>
                        </Form.Group>
                    ))}
                    <Button variant="danger" onClick={() => removeQuestion(qIndex)}>Remove Question</Button>
                </div>
            ))}
            <Button variant="primary" onClick={addQuestion}>Add Question</Button>
            <Button variant="success" type="submit">Create Exam</Button>
        </Form>
    );
};

export default CreateExam;
