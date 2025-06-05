import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/get_student/${id}`)
            .then((res) => {
                setStudent(res.data[0]); 
            })
            .catch((err) => console.log(err));
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setStudent((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .post(`/edit_user/${id}`, student)
            .then((res) => {
                navigate("/");
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-primary">Edit Student</h3>
                <Link to="/" className="btn btn-outline-success">
                    Back
                </Link>
            </div>

            <div className="card shadow p-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                            value={student.name}
                            type="text"
                            name="name"
                            required
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            value={student.email}
                            type="email"
                            name="email"
                            required
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="gender">Gender</label>
                        <select
                            name="gender"
                            required
                            value={student.gender}
                            className="form-control"
                            onChange={handleChange}
                        >
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="age">Age</label>
                        <input
                            value={student.age}
                            type="number"
                            name="age"
                            required
                            min="1"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-success px-4">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;
