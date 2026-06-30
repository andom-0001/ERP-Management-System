import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddGRN() {

    const navigate = useNavigate();

    const [purchaseOrders, setPurchaseOrders] = useState([]);

    const [grn, setGrn] = useState({

        purchaseOrder: "",

        supplier: "",

        product: "",

        receivedQuantity: "",

        remarks: ""

    });

    useEffect(() => {

        loadPurchaseOrders();

    }, []);

    const loadPurchaseOrders = async () => {

        try {

            const res = await API.get("/purchase-orders");

            // Optional: Only show Approved orders
            const approvedOrders = res.data.purchaseOrders.filter(
                po => po.status === "Approved"
            );

            setPurchaseOrders(approvedOrders);

        } catch (error) {

            console.log(error);

        }

    };

    const handlePurchaseOrderChange = (e) => {

        const orderId = e.target.value;

        const selectedOrder = purchaseOrders.find(
            po => po._id === orderId
        );

        if (!selectedOrder) return;

        setGrn({

            ...grn,

            purchaseOrder: orderId,

            supplier: selectedOrder.supplier._id,

            product: selectedOrder.product._id

        });

    };

    const handleChange = (e) => {

        setGrn({

            ...grn,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/grns", grn);

            alert("GRN Created Successfully");

            navigate("/grns");

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

                        <div className="card shadow mt-4">

                            <div className="card-header bg-success text-white">

                                <h3>Create Goods Receipt Note</h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label>Purchase Order</label>

                                        <select
                                            className="form-select"
                                            onChange={handlePurchaseOrderChange}
                                            required
                                        >

                                            <option value="">
                                                Select Purchase Order
                                            </option>

                                            {

                                                purchaseOrders.map(order => (

                                                    <option
                                                        key={order._id}
                                                        value={order._id}
                                                    >

                                                        {order._id}

                                                        {" | "}

                                                        {order.supplier?.name}

                                                        {" | "}

                                                        {order.product?.title}

                                                    </option>

                                                ))

                                            }

                                        </select>

                                    </div>

                                    <div className="mb-3">

                                        <label>Supplier</label>

                                        <input
                                            className="form-control"
                                            value={
                                                purchaseOrders.find(
                                                    po=>po._id===grn.purchaseOrder
                                                )?.supplier?.name || ""
                                            }
                                            readOnly
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Product</label>

                                        <input
                                            className="form-control"
                                            value={
                                                purchaseOrders.find(
                                                    po=>po._id===grn.purchaseOrder
                                                )?.product?.title || ""
                                            }
                                            readOnly
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Received Quantity</label>

                                        <input
                                            type="number"
                                            name="receivedQuantity"
                                            className="form-control"
                                            value={grn.receivedQuantity}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Remarks</label>

                                        <textarea
                                            rows="4"
                                            name="remarks"
                                            className="form-control"
                                            value={grn.remarks}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <button
                                        className="btn btn-success"
                                    >
                                        Save GRN
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

export default AddGRN;