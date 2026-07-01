import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddInvoice() {

    const navigate = useNavigate();

    const [salesOrders, setSalesOrders] = useState([]);

    const [invoice, setInvoice] = useState({

        salesOrder: "",

        customer: "",

        subtotal: 0,

        tax: 18,

        totalAmount: 0,

        paymentStatus: "Pending"

    });

    useEffect(() => {

        loadSalesOrders();

    }, []);

    const loadSalesOrders = async () => {

        try {

            const res = await API.get("/sales-orders");

            const completedOrders = res.data.salesOrders.filter(

                order => order.status === "Completed"

            );

            setSalesOrders(completedOrders);

        } catch (error) {

            console.log(error);

        }

    };

    const handleSalesOrder = (e) => {

        const id = e.target.value;

        const selectedOrder = salesOrders.find(

            order => order._id === id

        );

        if (!selectedOrder) return;

        const subtotal = selectedOrder.totalPrice;

        const tax = 18;

        const total = subtotal + (subtotal * tax / 100);

        setInvoice({

            salesOrder: selectedOrder._id,

            customer: selectedOrder.customer._id,

            subtotal,

            tax,

            totalAmount: total,

            paymentStatus: "Pending"

        });

    };

    const handleChange = (e) => {

        setInvoice({

            ...invoice,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/invoices", invoice);

            alert("Invoice Generated Successfully");

            navigate("/invoices");

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

                            <div className="card-header bg-success text-white">

                                <h3>Generate Invoice</h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label>Sales Order</label>

                                        <select
                                            className="form-select"
                                            onChange={handleSalesOrder}
                                            required
                                        >

                                            <option value="">

                                                Select Sales Order

                                            </option>

                                            {

                                                salesOrders.map(order => (

                                                    <option
                                                        key={order._id}
                                                        value={order._id}
                                                    >

                                                        {order.customer?.name}

                                                        {" | "}

                                                        {order.product?.title}

                                                    </option>

                                                ))

                                            }

                                        </select>

                                    </div>

                                    <div className="mb-3">

                                        <label>Customer</label>

                                        <input
                                            className="form-control"
                                            value={
                                                salesOrders.find(

                                                    order => order._id === invoice.salesOrder

                                                )?.customer?.name || ""
                                            }
                                            readOnly
                                        />

                                    </div>

                                    <div className="row">

                                        <div className="col-md-4">

                                            <label>Subtotal</label>

                                            <input
                                                className="form-control"
                                                value={invoice.subtotal}
                                                readOnly
                                            />

                                        </div>

                                        <div className="col-md-4">

                                            <label>Tax (%)</label>

                                            <input
                                                className="form-control"
                                                value={invoice.tax}
                                                readOnly
                                            />

                                        </div>

                                        <div className="col-md-4">

                                            <label>Total Amount</label>

                                            <input
                                                className="form-control"
                                                value={invoice.totalAmount}
                                                readOnly
                                            />

                                        </div>

                                    </div>

                                    <div className="mt-3">

                                        <label>Payment Status</label>

                                        <select
                                            className="form-select"
                                            name="paymentStatus"
                                            value={invoice.paymentStatus}
                                            onChange={handleChange}
                                        >

                                            <option>Pending</option>

                                            <option>Paid</option>

                                        </select>

                                    </div>

                                    <button
                                        className="btn btn-success mt-4"
                                    >

                                        Generate Invoice

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

export default AddInvoice;