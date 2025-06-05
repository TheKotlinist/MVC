import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        axios
            .get('/students')
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            axios
                .delete(`/delete/${id}`)
                .then(() => {
                    fetchData(); 
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-primary">Student List</h3>
                <Link className="btn btn-success" to="/create">
                    + Add Student
                </Link>
            </div>

            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2">Loading...</p>
                </div>
            ) : data.length === 0 ? (
                <div className="alert alert-warning text-center">No student data found.</div>
            ) : (
                <div className="table-responsive shadow rounded">
                    <table className="table table-striped table-hover">
                        <thead className="table-primary">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.age}</td>
                                    <td>{student.gender}</td>
                                    <td>
                                        <Link className="btn btn-sm btn-info me-2" to={`/read/${student.id}`}>
                                            Read
                                        </Link>
                                        <Link className="btn btn-sm btn-warning me-2" to={`/edit/${student.id}`}>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(student.id)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Home;
