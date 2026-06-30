import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function GRNs() {

    const [grns, setGrns] = useState([]);

    useEffect(() => {

        fetchGRNs();

    }, []);

    const fetchGRNs = async () => {

        try {

            const res = await API.get("/grns");

            setGrns(res.data.grns);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteGRN = async (id) => {

        if (!window.confirm("Delete GRN?"))
            return;

        try {

            await API.delete(`/grns/${id}`);

            fetchGRNs();

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

                            <h2>Goods Receipt Notes</h2>

                            <Link
                                to="/grns/add"
                                className="btn btn-success"
                            >
                                Add GRN
                            </Link>

                        </div>

                        <table className="table table-bordered table-hover mt-4">

                            <thead className="table-dark">

                                <tr>

                                    <th>Purchase Order</th>

                                    <th>Supplier</th>

                                    <th>Product</th>

                                    <th>Received Qty</th>

                                    <th>Date</th>

                                    <th>Remarks</th>

                                    <th width="150">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    grns.length > 0 ?

                                    grns.map((grn)=>(

                                        <tr key={grn._id}>

                                            <td>{grn.purchaseOrder?._id}</td>

                                            <td>{grn.supplier?.name}</td>

                                            <td>{grn.product?.title}</td>

                                            <td>{grn.receivedQuantity}</td>

                                            <td>

                                                {

                                                    new Date(grn.receivedDate)

                                                    .toLocaleDateString()

                                                }

                                            </td>

                                            <td>{grn.remarks}</td>

                                            <td>

                                                <button

                                                    className="btn btn-danger btn-sm"

                                                    onClick={()=>deleteGRN(grn._id)}

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

                                            No GRNs Found

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

export default GRNs;