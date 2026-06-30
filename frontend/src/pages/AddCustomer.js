import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddCustomer() {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {

        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/customers", customer);

            alert("Customer Added Successfully");

            navigate("/customers");

        } catch (error) {

            alert(error.response?.data?.message || "Error");

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

                    <div className="col-md-10">

                        <div className="card mt-4 shadow">

                            <div className="card-header bg-success text-white">

                                <h3>Add Customer</h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <input
                                        className="form-control mb-3"
                                        placeholder="Customer Name"
                                        name="name"
                                        value={customer.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        className="form-control mb-3"
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        value={customer.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        className="form-control mb-3"
                                        placeholder="Phone"
                                        name="phone"
                                        value={customer.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                    <textarea
                                        className="form-control mb-3"
                                        placeholder="Address"
                                        name="address"
                                        rows="4"
                                        value={customer.address}
                                        onChange={handleChange}
                                        required
                                    />

                                    <button className="btn btn-success">
                                        Save Customer
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AddCustomer;