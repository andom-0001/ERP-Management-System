import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

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

            setLoading(true);

            const res = await API.post("/auth/login", formData);

            login(res.data.user, res.data.token);

            navigate("/dashboard");

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                ERP Login
                            </h2>

                            {message && (
                                <div className="alert alert-danger">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >

                                    {loading ? "Logging In..." : "Login"}

                                </button>

                            </form>

                            <p className="text-center mt-3">

                                Don't have an account?

                                <Link to="/register">
                                    {" "}Register
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;