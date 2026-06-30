import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Customers() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {

        try {

            const res = await API.get("/customers");

            setCustomers(res.data.customers);

        } catch (error) {

            console.log(error);

            alert("Unable to load customers");

        }

    };

    const deleteCustomer = async (id) => {

        if (!window.confirm("Delete this customer?")) return;

        try {

            await API.delete(`/customers/${id}`);

            fetchCustomers();

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

                        <div className="d-flex justify-content-between mt-4">

                            <h2>Customers</h2>

                            <Link
                                to="/customers/add"
                                className="btn btn-success"
                            >
                                Add Customer
                            </Link>

                        </div>

                        <table className="table table-bordered table-hover mt-4">

                            <thead className="table-dark">

                                <tr>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>Address</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    customers.length > 0 ?

                                    customers.map(customer => (

                                        <tr key={customer._id}>

                                            <td>{customer.name}</td>

                                            <td>{customer.email}</td>

                                            <td>{customer.phone}</td>

                                            <td>{customer.address}</td>

                                            <td>

                                                <Link
                                                    className="btn btn-warning btn-sm me-2"
                                                    to={`/customers/edit/${customer._id}`}
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteCustomer(customer._id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center"
                                        >

                                            No Customers Found

                                        </td>

                                    </tr>

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Customers;