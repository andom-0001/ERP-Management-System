import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function SalesOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchSalesOrders();
    }, []);

    const fetchSalesOrders = async () => {

        try {

            const res = await API.get("/sales-orders");

            setOrders(res.data.salesOrders);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteSalesOrder = async (id) => {

        if (!window.confirm("Delete Sales Order?")) return;

        try {

            await API.delete(`/sales-orders/${id}`);

            fetchSalesOrders();

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

                            <h2>Sales Orders</h2>

                            <Link
                                to="/sales-orders/add"
                                className="btn btn-success"
                            >
                                Add Sales Order
                            </Link>

                        </div>

                        <table className="table table-bordered table-hover mt-4">

                            <thead className="table-dark">

                                <tr>

                                    <th>Customer</th>

                                    <th>Product</th>

                                    <th>Quantity</th>

                                    <th>Unit Price</th>

                                    <th>Total</th>

                                    <th>Status</th>

                                    <th width="180">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    orders.length > 0 ?

                                    orders.map((order)=>(

                                        <tr key={order._id}>

                                            <td>{order.customer?.name}</td>

                                            <td>{order.product?.title}</td>

                                            <td>{order.quantity}</td>

                                            <td>₹ {order.unitPrice}</td>

                                            <td>₹ {order.totalPrice}</td>

                                            <td>

                                                <span className="badge bg-primary">

                                                    {order.status}

                                                </span>

                                            </td>

                                            <td>

                                                <Link
                                                    to={`/sales-orders/edit/${order._id}`}
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteSalesOrder(order._id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center"
                                        >
                                            No Sales Orders Found
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

export default SalesOrders;