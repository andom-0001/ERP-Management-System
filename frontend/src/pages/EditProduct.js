import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({

        title: "",
        sku: "",
        category: "",
        price: "",
        stock: "",
        description: ""

    });

    useEffect(() => {

        getProduct();

    }, []);

    const getProduct = async () => {

        try {

            const res = await API.get(`/products/${id}`);

            setProduct(res.data.product);

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const handleChange = (e) => {

        setProduct({

            ...product,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/products/${id}`, product);

            alert("Product Updated Successfully");

            navigate("/products");

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

                            <div className="card-header bg-warning">

                                <h3>Edit Product</h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label>Product Title</label>

                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            value={product.title}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>SKU</label>

                                        <input
                                            type="text"
                                            name="sku"
                                            className="form-control"
                                            value={product.sku}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Category</label>

                                        <input
                                            type="text"
                                            name="category"
                                            className="form-control"
                                            value={product.category}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="row">

                                        <div className="col-md-6">

                                            <label>Price</label>

                                            <input
                                                type="number"
                                                name="price"
                                                className="form-control"
                                                value={product.price}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        <div className="col-md-6">

                                            <label>Stock</label>

                                            <input
                                                type="number"
                                                name="stock"
                                                className="form-control"
                                                value={product.stock}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>

                                    <div className="mt-3">

                                        <label>Description</label>

                                        <textarea
                                            rows="4"
                                            name="description"
                                            className="form-control"
                                            value={product.description}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <button
                                        className="btn btn-warning mt-4"
                                    >
                                        Update Product
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

export default EditProduct;