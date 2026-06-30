import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Products() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

        getProducts();

    }, [page, search]);

    const getProducts = async () => {

        try {

            const res = await API.get(
                `/products?page=${page}&search=${search}`
            );

            setProducts(res.data.products);

            setTotalPages(res.data.totalPages);

        } catch (err) {

            console.log(err);

        }

    };

    const deleteProduct = async (id) => {

        if (!window.confirm("Delete Product?"))
            return;

        try {

            await API.delete(`/products/${id}`);

            getProducts();

        } catch (err) {

            alert(err.response?.data?.message);

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

                            <h2>Products</h2>

                            <Link
                                to="/products/add"
                                className="btn btn-success"
                            >
                                Add Product
                            </Link>

                        </div>

                        <input

                            className="form-control mt-3"

                            placeholder="Search Product"

                            value={search}

                            onChange={(e)=>setSearch(e.target.value)}

                        />

                        <table className="table table-bordered mt-4">

                            <thead>

                                <tr>

                                    <th>Title</th>

                                    <th>SKU</th>

                                    <th>Category</th>

                                    <th>Price</th>

                                    <th>Stock</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    products.map(product=>(

                                        <tr key={product._id}>

                                            <td>{product.title}</td>

                                            <td>{product.sku}</td>

                                            <td>{product.category}</td>

                                            <td>{product.price}</td>

                                            <td>{product.stock}</td>

                                            <td>

                                                <Link

                                                    className="btn btn-warning btn-sm me-2"

                                                    to={`/products/edit/${product._id}`}

                                                >

                                                    Edit

                                                </Link>

                                                <button

                                                    className="btn btn-danger btn-sm"

                                                    onClick={()=>deleteProduct(product._id)}

                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                        <div className="mt-3">

                            <button

                                disabled={page===1}

                                onClick={()=>setPage(page-1)}

                                className="btn btn-secondary me-2"

                            >

                                Previous

                            </button>

                            <span>

                                Page {page} of {totalPages}

                            </span>

                            <button

                                disabled={page===totalPages}

                                onClick={()=>setPage(page+1)}

                                className="btn btn-secondary ms-2"

                            >

                                Next

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Products;