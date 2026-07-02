import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

function Reports() {

    const [report, setReport] = useState({});

    useEffect(() => {

        loadReport();

    }, []);

    const loadReport = async () => {

        try {

            const res = await API.get("/reports/dashboard");

            setReport(res.data.report);

        }

        catch (error) {

            console.log(error);

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

                        <h2 className="mt-4">

                            ERP Reports

                        </h2>

                        <table className="table table-bordered mt-4">

                            <thead>

                                <tr>

                                    <th>Report</th>

                                    <th>Total</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td>Products</td>

                                    <td>{report.products}</td>

                                </tr>

                                <tr>

                                    <td>Customers</td>

                                    <td>{report.customers}</td>

                                </tr>

                                <tr>

                                    <td>Suppliers</td>

                                    <td>{report.suppliers}</td>

                                </tr>

                                <tr>

                                    <td>Purchase Orders</td>

                                    <td>{report.purchaseOrders}</td>

                                </tr>

                                <tr>

                                    <td>Sales Orders</td>

                                    <td>{report.salesOrders}</td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Reports;