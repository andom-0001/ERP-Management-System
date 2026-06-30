import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {

            const res = await API.get("/products");

            setTotalProducts(res.data.totalProducts);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>

            <Navbar />

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-2">

                        <Sidebar />

                    </div>

                    <div className="col-md-10 mt-4">

                        <h2>
                            Welcome {user?.name}
                        </h2>

                        <hr />

                        <div className="row">

                            <div className="col-md-4">

                                <div className="card shadow">

                                    <div className="card-body">

                                        <h4>Total Products</h4>

                                        <h1>{totalProducts}</h1>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-4">

                                <div className="card shadow">

                                    <div className="card-body">

                                        <h4>Role</h4>

                                        <h3>{user?.role}</h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="mt-5">

                            <button
                                className="btn btn-primary me-3"
                                onClick={() => navigate("/products")}
                            >
                                Manage Products
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={() => navigate("/profile")}
                            >
                                My Profile
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;