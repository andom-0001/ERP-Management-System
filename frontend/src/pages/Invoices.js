import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Invoices() {

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {

        fetchInvoices();

    }, []);

    const fetchInvoices = async () => {

        try {

            const res = await API.get("/invoices");

            setInvoices(res.data.invoices);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteInvoice = async (id) => {

        if (!window.confirm("Delete Invoice?")) return;

        try {

            await API.delete(`/invoices/${id}`);

            fetchInvoices();

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

                            <h2>Invoices</h2>

                            <Link
                                to="/invoices/add"
                                className="btn btn-success"
                            >
                                Generate Invoice
                            </Link>

                        </div>

                        <table className="table table-bordered table-hover mt-4">

                            <thead className="table-dark">

                                <tr>

                                    <th>Invoice ID</th>

                                    <th>Customer</th>

                                    <th>Sales Order</th>

                                    <th>Total</th>

                                    <th>Status</th>

                                    <th width="220">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    invoices.length > 0 ?

                                    invoices.map(invoice => (

                                        <tr key={invoice._id}>

                                            <td>{invoice._id.slice(-6)}</td>

                                            <td>{invoice.customer?.name}</td>

                                            <td>{invoice.salesOrder?._id.slice(-6)}</td>

                                            <td>₹ {invoice.totalAmount}</td>

                                            <td>

                                                <span
                                                    className={
                                                        invoice.paymentStatus === "Paid"
                                                        ? "badge bg-success"
                                                        : "badge bg-warning text-dark"
                                                    }
                                                >

                                                    {invoice.paymentStatus}

                                                </span>

                                            </td>

                                            <td>

                                                <Link
                                                    to={`/invoices/view/${invoice._id}`}
                                                    className="btn btn-info btn-sm me-2"
                                                >
                                                    View
                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteInvoice(invoice._id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >

                                            No Invoices Found

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

export default Invoices;