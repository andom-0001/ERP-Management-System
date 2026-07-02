import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

function InventoryReport() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        loadInventory();

    }, []);

    const loadInventory = async () => {

        try {

            const res = await API.get("/reports/inventory");

            setProducts(res.data.products);

        }

        catch(error){

            console.log(error);

        }

    };

    return (

        <>

            <Navbar/>

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-2">

                        <Sidebar/>

                    </div>

                    <div className="col-md-10">

                        <h2 className="mt-4">

                            Inventory Report

                        </h2>

                        <table className="table table-bordered table-hover mt-4">

                            <thead className="table-dark">

                                <tr>

                                    <th>Product</th>

                                    <th>SKU</th>

                                    <th>Category</th>

                                    <th>Price</th>

                                    <th>Stock</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    products.map(product=>(

                                        <tr key={product._id}>

                                            <td>{product.title}</td>

                                            <td>{product.sku}</td>

                                            <td>{product.category}</td>

                                            <td>₹ {product.price}</td>

                                            <td>

                                                {

                                                    product.stock<10 ?

                                                    <span className="badge bg-danger">

                                                        {product.stock}

                                                    </span>

                                                    :

                                                    <span className="badge bg-success">

                                                        {product.stock}

                                                    </span>

                                                }

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>

    );

}

export default InventoryReport;