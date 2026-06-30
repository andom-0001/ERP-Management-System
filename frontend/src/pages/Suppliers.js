import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Suppliers() {

    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {

        try {

            const res = await API.get("/suppliers");

            setSuppliers(res.data.suppliers);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteSupplier = async (id) => {

        if (!window.confirm("Delete Supplier?")) return;

        try {

            await API.delete(`/suppliers/${id}`);

            fetchSuppliers();

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

                            <h2>Supplier Management</h2>

                            <Link
                                to="/suppliers/add"
                                className="btn btn-success"
                            >
                                Add Supplier
                            </Link>

                        </div>

                        <table className="table table-bordered table-hover mt-4">

                            <thead className="table-dark">

                                <tr>

                                    <th>Name</th>

                                    <th>Company</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>Address</th>

                                    <th width="180">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    suppliers.length > 0 ?

                                    suppliers.map((supplier)=>(

                                        <tr key={supplier._id}>

                                            <td>{supplier.name}</td>

                                            <td>{supplier.company}</td>

                                            <td>{supplier.email}</td>

                                            <td>{supplier.phone}</td>

                                            <td>{supplier.address}</td>

                                            <td>

                                                <Link
                                                    to={`/suppliers/edit/${supplier._id}`}
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={()=>deleteSupplier(supplier._id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td colSpan="6" className="text-center">

                                            No Suppliers Found

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

export default Suppliers;