import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

const ExamDetails = () => {
    const { id } = useParams();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExamDetails();
    }, [id]);

    const fetchExamDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/exams/${id}`);
            setExam(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching exam details:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!exam) {
        return <div>No exam found</div>;
    }

    return (
        <Container>
            <h2>Exam Details</h2>
            <p><strong>ID:</strong> {exam.id}</p>
            <p><strong>Name:</strong> {exam.name}</p>
            <p><strong>Duration:</strong> {exam.duration}</p>
            <p><strong>Started At:</strong> {exam.started_at}</p>
            <p><strong>Expire At:</strong> {exam.expire_at}</p>
            <h3>Questions</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Degree</th>
                        <th>Answers</th>
                    </tr>
                </thead>
                <tbody>
                    {exam.questions.map((question) => (
                        <tr key={question.id}>
                            <td>{question.question}</td>
                            <td>{question.degree}</td>
                            <td>
                                <ul>
                                    {question.answers.map((answer) => (
                                        <li key={answer.id}>
                                            {answer.answer} {answer.is_correct ? "(Correct)" : ""}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ExamDetails;
