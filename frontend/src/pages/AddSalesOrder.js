import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddSalesOrder() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    const [order, setOrder] = useState({

        customer: "",
        product: "",
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        status: "Pending"

    });

    useEffect(() => {

        loadCustomers();
        loadProducts();

    }, []);

    const loadCustomers = async () => {

        try {

            const res = await API.get("/customers");

            setCustomers(res.data.customers);

        } catch (error) {

            console.log(error);

        }

    };

    const loadProducts = async () => {

        try {

            const res = await API.get("/products");

            setProducts(res.data.products);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "product") {

            const selectedProduct = products.find(
                product => product._id === value
            );

            const price = selectedProduct ? selectedProduct.price : 0;

            setOrder({

                ...order,

                product: value,

                unitPrice: price,

                totalPrice: price * order.quantity

            });

        }

        else if (name === "quantity") {

            const qty = Number(value);

            setOrder({

                ...order,

                quantity: qty,

                totalPrice: qty * order.unitPrice

            });

        }

        else {

            setOrder({

                ...order,

                [name]: value

            });

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/sales-orders", order);

            alert("Sales Order Created Successfully");

            navigate("/sales-orders");

        }

        catch (error) {

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

                        <div className="card shadow mt-4">

                            <div className="card-header bg-success text-white">

                                <h3>Add Sales Order</h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label>Customer</label>

                                        <select
                                            className="form-select"
                                            name="customer"
                                            value={order.customer}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select Customer
                                            </option>

                                            {

                                                customers.map(customer => (

                                                    <option
                                                        key={customer._id}
                                                        value={customer._id}
                                                    >

                                                        {customer.name}

                                                    </option>

                                                ))

                                            }

                                        </select>

                                    </div>

                                    <div className="mb-3">

                                        <label>Product</label>

                                        <select
                                            className="form-select"
                                            name="product"
                                            value={order.product}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select Product
                                            </option>

                                            {

                                                products.map(product => (

                                                    <option
                                                        key={product._id}
                                                        value={product._id}
                                                    >

                                                        {product.title}

                                                    </option>

                                                ))

                                            }

                                        </select>

                                    </div>

                                    <div className="row">

                                        <div className="col-md-4">

                                            <label>Quantity</label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                name="quantity"
                                                value={order.quantity}
                                                onChange={handleChange}
                                                min="1"
                                            />

                                        </div>

                                        <div className="col-md-4">

                                            <label>Unit Price</label>

                                            <input
                                                className="form-control"
                                                value={order.unitPrice}
                                                readOnly
                                            />

                                        </div>

                                        <div className="col-md-4">

                                            <label>Total Price</label>

                                            <input
                                                className="form-control"
                                                value={order.totalPrice}
                                                readOnly
                                            />

                                        </div>

                                    </div>

                                    <div className="mt-3">

                                        <label>Status</label>

                                        <select
                                            className="form-select"
                                            name="status"
                                            value={order.status}
                                            onChange={handleChange}
                                        >

                                            <option>Pending</option>
                                            <option>Completed</option>
                                            <option>Cancelled</option>

                                        </select>

                                    </div>

                                    <button
                                        className="btn btn-success mt-4"
                                    >

                                        Save Sales Order

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

export default AddSalesOrder;