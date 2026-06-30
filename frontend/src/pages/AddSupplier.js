import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddSupplier() {

    const navigate = useNavigate();

    const [supplier, setSupplier] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setSupplier({
            ...supplier,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/suppliers", supplier);

            alert("Supplier Added Successfully");

            navigate("/suppliers");

        } catch (error) {

            alert(error.response?.data?.message || "Error Adding Supplier");

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

                        <div className="card shadow mt-4">

                            <div className="card-header bg-success text-white">

                                <h3>Add Supplier</h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label>Supplier Name</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={supplier.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Company</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="company"
                                            value={supplier.company}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Email</label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={supplier.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Phone</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={supplier.phone}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Address</label>

                                        <textarea
                                            rows="4"
                                            className="form-control"
                                            name="address"
                                            value={supplier.address}
                                            onChange={handleChange}
                                            required
                                        ></textarea>

                                    </div>

                                    <button
                                        className="btn btn-success"
                                    >
                                        Save Supplier
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

export default AddSupplier;