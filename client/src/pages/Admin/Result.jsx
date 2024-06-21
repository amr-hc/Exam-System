import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const ResultComponent = () => {
    const [results, setResults] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/exams/${id}/results`);
            setResults(response.data.data);
            
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    return (
        <div>
            <h2>Exam Results</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{result.student_id}</td>
                            <td>{result.student_name}</td>
                            <td>{result.score}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ResultComponent;
