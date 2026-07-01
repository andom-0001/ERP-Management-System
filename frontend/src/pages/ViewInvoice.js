import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ViewInvoice() {

    const { id } = useParams();

    const [invoice, setInvoice] = useState(null);

    useEffect(() => {

        fetchInvoice();

    }, []);

    const fetchInvoice = async () => {

        try {

            const res = await API.get(`/invoices/${id}`);

            setInvoice(res.data.invoice);

        } catch (error) {

            console.log(error);

        }

    };

    if (!invoice) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }
    const downloadPDF = () => {

        const invoice = document.getElementById("invoice");

        html2canvas(invoice, {
            scale: 2
        }).then((canvas) => {

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");

            const pdfWidth = pdf.internal.pageSize.getWidth();

            const pdfHeight =
                (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(
                imgData,
                "PNG",
                0,
                0,
                pdfWidth,
                pdfHeight
            );

            pdf.save(`Invoice-${id}.pdf`);

        });

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

                        <div className="text-end mt-3">

                            <button
                                className="btn btn-primary"
                                onClick={downloadPDF}
                            >
                                Download PDF
                            </button>

                        </div>

                        <div
                            className="card shadow mt-4 p-4"
                            id="invoice"
                        >

                            <div className="d-flex justify-content-between">

                                <div>

                                    <h2>ERP Management System</h2>

                                    <p>ABC Technologies Pvt. Ltd.</p>

                                    <p>Hyderabad, Telangana</p>

                                    <p>GSTIN : 36ABCDE1234F1Z5</p>

                                    <p>Phone : +91 9876543210</p>

                                    <p>Email : support@abcerp.com</p>

                                </div>

                                <div>

                                    <h3>INVOICE</h3>

                                    <p>

                                        <strong>ID:</strong>

                                        {invoice._id}

                                    </p>

                                    <p>

                                        <strong>Date:</strong>

                                        {

                                            new Date(

                                                invoice.createdAt

                                            ).toLocaleDateString()

                                        }

                                    </p>

                                </div>

                            </div>

                            <hr />

                            <h5>Customer Information</h5>

                            <p>

                                <strong>Name : </strong>

                                {invoice.customer?.name}

                            </p>

                            <p>

                                <strong>Email : </strong>

                                {invoice.customer?.email}

                            </p>

                            <hr />

                            <table className="table table-bordered">

                                <thead className="table-dark">

                                    <tr>

                                        <th>Product</th>

                                        <th>Quantity</th>

                                        <th>Unit Price</th>

                                        <th>Total</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    <tr>

                                        <td>

                                            {

                                                invoice.salesOrder?.product?.title

                                            }

                                        </td>

                                        <td>

                                            {

                                                invoice.salesOrder?.quantity

                                            }

                                        </td>

                                        <td>

                                            ₹ {

                                                invoice.salesOrder?.unitPrice

                                            }

                                        </td>

                                        <td>

                                            ₹ {

                                                invoice.salesOrder?.totalPrice

                                            }

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                            <div className="text-end">

                                <h5>

                                    Subtotal :

                                    ₹ {invoice.subtotal}

                                </h5>

                                <h5>

                                    GST :

                                    {invoice.tax}%

                                </h5>

                                <h3>

                                    Grand Total :

                                    ₹ {invoice.totalAmount}

                                </h3>

                                <h5>

                                    Payment :

                                    <span
                                        className={
                                            invoice.paymentStatus === "Paid"

                                                ?

                                                "text-success"

                                                :

                                                "text-danger"
                                        }
                                    >

                                        {" "}

                                        {invoice.paymentStatus}

                                    </span>

                                </h5>

                            </div>

                            <hr />

                            <div className="text-center">

                                <h5>

                                    Thank You!

                                </h5>

                                <p>

                                    ERP Inventory Management System

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default ViewInvoice;