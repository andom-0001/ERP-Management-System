import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        role: "Employee"

    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/auth/register", formData);

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Registration Failed"
            );

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Register
                            </h2>

                            {message && (
                                <div className="alert alert-danger">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <input
                                    className="form-control mb-3"
                                    placeholder="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-3"
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-3"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <select
                                    className="form-select mb-3"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >

                                    <option>Employee</option>
                                    <option>Manager</option>
                                    <option>Admin</option>

                                </select>

                                <button className="btn btn-success w-100">
                                    Register
                                </button>

                            </form>

                            <p className="text-center mt-3">

                                Already Registered?

                                <Link to="/login">
                                    {" "}Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;