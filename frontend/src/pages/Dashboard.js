import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

function Dashboard() {

    const { user } = useContext(AuthContext);

    const [dashboard, setDashboard] = useState({

        products: 0,
        customers: 0,
        suppliers: 0,
        purchaseOrders: 0,
        salesOrders: 0,
        invoices: 0

    });

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const [

                products,

                customers,

                suppliers,

                purchaseOrders,

                salesOrders,

                invoices

            ] = await Promise.all([

                API.get("/products"),

                API.get("/customers"),

                API.get("/suppliers"),

                API.get("/purchase-orders"),

                API.get("/sales-orders"),

                API.get("/invoices")

            ]);

            setDashboard({

                products: products.data.products.length,

                customers: customers.data.customers.length,

                suppliers: suppliers.data.suppliers.length,

                purchaseOrders:
                    purchaseOrders.data.purchaseOrders.length,

                salesOrders:
                    salesOrders.data.salesOrders.length,

                invoices:
                    invoices.data.invoices.length

            });

        } catch (error) {

            console.log(error);

        }

    };

    const barData = {

        labels: [

            "Products",

            "Customers",

            "Suppliers",

            "Purchase Orders",

            "Sales Orders",

            "Invoices"

        ],

        datasets: [

            {

                label: "ERP Statistics",

                data: [

                    dashboard.products,

                    dashboard.customers,

                    dashboard.suppliers,

                    dashboard.purchaseOrders,

                    dashboard.salesOrders,

                    dashboard.invoices

                ],

                backgroundColor: [

                    "#0d6efd",

                    "#198754",

                    "#ffc107",

                    "#dc3545",

                    "#6f42c1",

                    "#20c997"

                ]

            }

        ]

    };

    const pieData = {

        labels: [

            "Products",

            "Customers",

            "Suppliers",

            "Purchase Orders",

            "Sales Orders",

            "Invoices"

        ],

        datasets: [

            {

                data: [

                    dashboard.products,

                    dashboard.customers,

                    dashboard.suppliers,

                    dashboard.purchaseOrders,

                    dashboard.salesOrders,

                    dashboard.invoices

                ],

                backgroundColor: [

                    "#0d6efd",

                    "#198754",

                    "#ffc107",

                    "#dc3545",

                    "#6f42c1",

                    "#20c997"

                ]

            }

        ]

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

                        <div className="mt-4">

                            <h2>

                                Welcome,

                                {" "}

                                {user?.name}

                            </h2>

                            <p>

                                Role :

                                <strong>

                                    {" "}

                                    {user?.role}

                                </strong>

                            </p>

                        </div>

                        <hr />

                        <div className="row">

                            <div className="col-md-4 mb-4">

                                <div className="card bg-primary text-white shadow">

                                    <div className="card-body">

                                        <h5>Total Products</h5>

                                        <h1>{dashboard.products}</h1>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-4 mb-4">

                                <div className="card bg-success text-white shadow">

                                    <div className="card-body">

                                        <h5>Total Customers</h5>

                                        <h1>{dashboard.customers}</h1>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-4 mb-4">

                                <div className="card bg-warning shadow">

                                    <div className="card-body">

                                        <h5>Total Suppliers</h5>

                                        <h1>{dashboard.suppliers}</h1>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-4 mb-4">

                                <div className="card bg-danger text-white shadow">

                                    <div className="card-body">

                                        <h5>Purchase Orders</h5>

                                        <h1>{dashboard.purchaseOrders}</h1>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-4 mb-4">

                                <div className="card bg-info text-white shadow">

                                    <div className="card-body">

                                        <h5>Sales Orders</h5>

                                        <h1>{dashboard.salesOrders}</h1>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-4 mb-4">

                                <div className="card bg-dark text-white shadow">

                                    <div className="card-body">

                                        <h5>Invoices</h5>

                                        <h1>{dashboard.invoices}</h1>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="row mt-4">

                            <div className="col-md-8">

                                <div className="card shadow">

                                    <div className="card-header">

                                        <h4>

                                            ERP Statistics

                                        </h4>

                                    </div>

                                    <div className="card-body">

                                        <Bar data={barData} />

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-4">

                                <div className="card shadow">

                                    <div className="card-header">

                                        <h4>

                                            Distribution

                                        </h4>

                                    </div>

                                    <div className="card-body">

                                        <Pie data={pieData} />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;