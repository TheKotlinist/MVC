import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/get_student/${id}`)
            .then((res) => {
                setStudent(res.data[0]);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div className="container mt-4">
            <h3 className="text-white mb-4">Student Detail</h3>

            <div className="card shadow">
                {student ? (
                    <>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>ID:</b> {student.id}
                            </li>
                            <li className="list-group-item">
                                <b>Name:</b> {student.name}
                            </li>
                            <li className="list-group-item">
                                <b>Email:</b> {student.email}
                            </li>
                            <li className="list-group-item">
                                <b>Age:</b> {student.age}
                            </li>
                            <li className="list-group-item">
                                <b>Gender:</b> {student.gender}
                            </li>
                        </ul>

                        <div className="card-body text-end">
                            <Link to="/" className="btn btn-success">
                                Back to Home
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="card-body">
                        <p className="text-muted">Loading data...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Read;
