import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const ExamList = () => {
    const [exams, setExams] = useState([]);

    const navigate = useNavigate();

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
        navigate(`/admin/exam/${id}`)
    };

    const editExam = (id) => {
        navigate(`/admin/edit-exam/${id}`)
    };
    const ResultExam = (id) => {
        navigate(`/admin/exam/${id}/result/`)
    };


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
                                <Button variant="warning" onClick={() => ResultExam(exam.id)}>Result</Button>{' '}
                                <Button variant="primary" onClick={() => editExam(exam.id)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => deleteExam(exam.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    );
};


export default ExamList;
