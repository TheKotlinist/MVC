import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (values.age <= 0) {
            alert('Age must be a positive number.');
            return;
        }

        axios
            .post('/add_user', values)
            .then((res) => {
                navigate('/');
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-primary">Add Student</h3>
                <Link to="/" className="btn btn-outline-success">
                    Home
                </Link>
            </div>

            <div className="card shadow p-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="form-control"
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="form-control"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="gender">Gender</label>
                        <select
                            name="gender"
                            required
                            className="form-control"
                            onChange={(e) => setValues({ ...values, gender: e.target.value })}
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
                            type="number"
                            name="age"
                            required
                            min="1"
                            className="form-control"
                            onChange={(e) => setValues({ ...values, age: e.target.value })}
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

export default Create;
