import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Container, Card } from 'react-bootstrap';

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
        <Container className="mt-4">
            <Card>
                <Card.Header as="h2">Exam Details</Card.Header>
                <Card.Body>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td><strong>ID:</strong></td>
                                <td>{exam.id}</td>
                            </tr>
                            <tr>
                                <td><strong>Name:</strong></td>
                                <td>{exam.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Duration:</strong></td>
                                <td>{exam.duration}</td>
                            </tr>
                            <tr>
                                <td><strong>Started At:</strong></td>
                                <td>{exam.started_at}</td>
                            </tr>
                            <tr>
                                <td><strong>Expire At:</strong></td>
                                <td>{exam.expire_at}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <h3 className="mt-4">Questions</h3>
            <Table striped bordered hover className="mt-2">
                <thead className="thead-dark">
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
                                <ul className="list-unstyled">
                                    {question.answers.map((answer) => (
                                        <li 
                                            key={answer.id} 
                                            className="mb-1"
                                            style={{
                                                color: answer.is_correct ? 'green' : 'black',
                                                fontWeight: answer.is_correct ? 'bold' : 'normal',
                                                backgroundColor: answer.is_correct ? '#d4edda' : 'transparent',
                                                padding: answer.is_correct ? '5px' : '0',
                                                borderRadius: answer.is_correct ? '5px' : '0'
                                            }}
                                        >
                                            {answer.answer}
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
