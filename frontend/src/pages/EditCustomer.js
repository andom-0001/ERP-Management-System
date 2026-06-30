import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EditCustomer() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {

    const getCustomer = async () => {

        try {

            const res = await API.get(`/customers/${id}`);

            setCustomer(res.data.customer);

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    getCustomer();

}, [id]);

    const handleChange = (e) => {

        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/customers/${id}`, customer);

            alert("Customer Updated Successfully");

            navigate("/customers");

        } catch (error) {

            alert(error.response?.data?.message);

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

                            <div className="card-header bg-warning">

                                <h3>Edit Customer</h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <input
                                        className="form-control mb-3"
                                        name="name"
                                        value={customer.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        className="form-control mb-3"
                                        type="email"
                                        name="email"
                                        value={customer.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        className="form-control mb-3"
                                        name="phone"
                                        value={customer.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                    <textarea
                                        className="form-control mb-3"
                                        rows="4"
                                        name="address"
                                        value={customer.address}
                                        onChange={handleChange}
                                        required
                                    />

                                    <button className="btn btn-warning">
                                        Update Customer
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

export default EditCustomer;