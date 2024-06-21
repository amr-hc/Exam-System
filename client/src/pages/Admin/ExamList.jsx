import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';

const ExamList = () => {
    const [exams, setExams] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentExam, setCurrentExam] = useState(null);

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/exams');
            setExams(response.data.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const deleteExam = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/exams/${id}`);
            setExams(exams.filter(exam => exam.id !== id));
        } catch (error) {
            console.error('Error deleting exam:', error);
        }
    };

    const viewDetails = (id) => {
        setCurrentExam(id);
        setShowModal(true);
    };

    const editExam = (id) => {
        window.location.href = `/admin/edit-exam/${id}`;
    };

    const handleClose = () => setShowModal(false);

    return (
        <div>
            <h2>Exam List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Started At</th>
                        <th>Expire At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exams.map(exam => (
                        <tr key={exam.id}>
                            <td>{exam.id}</td>
                            <td>{exam.name}</td>
                            <td>{exam.duration}</td>
                            <td>{exam.started_at}</td>
                            <td>{exam.expire_at}</td>
                            <td>
                                <Button variant="info" onClick={() => viewDetails(exam.id)}>Details</Button>{' '}
                                <Button variant="primary" onClick={() => editExam(exam.id)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => deleteExam(exam.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Exam Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentExam && <ExamDetails examId={currentExam} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const ExamDetails = ({ examId }) => {
    const [exam, setExam] = useState(null);

    useEffect(() => {
        fetchExamDetails();
    }, [examId]);

    const fetchExamDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/exams/${examId}`);
            setExam(response.data);
        } catch (error) {
            console.error('Error fetching exam details:', error);
        }
    };

    if (!exam) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>ID: {exam.id}</p>
            <p>Name: {exam.name}</p>
            <p>Duration: {exam.duration}</p>
            <p>Started At: {exam.started_at}</p>
            <p>Expire At: {exam.expire_at}</p>
            <p>Questions:</p>
            <ul>
                {exam.questions.map(question => (
                    <li key={question.id}>
                        {question.question} (Degree: {question.degree})
                        <ul>
                            {question.answers.map(answer => (
                                <li key={answer.id}>{answer.answer}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExamList;
