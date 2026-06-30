import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div
            className="bg-light p-3"
            style={{ minHeight: "100vh" }}
        >

            <h4>Menu</h4>

            <hr />

            <ul className="nav flex-column">

                <li className="nav-item mb-3">

                    <Link
                        className="nav-link"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>

                </li>

                <li className="nav-item mb-3">

                    <Link
                        className="nav-link"
                        to="/products"
                    >
                        Products
                    </Link>

                </li>

                <li className="nav-item mb-3">

                    <Link
                        className="nav-link"
                        to="/profile"
                    >
                        Profile
                    </Link>

                </li>
                <li className="nav-item mb-3">

                    <Link
                        className="nav-link"
                        to="/customers"
                    >
                        Customers
                    </Link>

                </li>
                <li className="nav-item mb-3">

                    <Link
                        className="nav-link"
                        to="/suppliers"
                    >
                        Suppliers
                    </Link>
                </li>
                <li className="nav-item mb-3">

                    <Link
                        className="nav-link"
                        to="/purchase-orders"
                    >
                        Purchase Orders
                    </Link>
                </li>
                <li className="nav-item mb-3">

                    <Link
                        className="nav-link"
                        to="/grns"
                    >
                        GRNs
                    </Link>
                </li>

            </ul>
        </div>

    );

}

export default Sidebar;