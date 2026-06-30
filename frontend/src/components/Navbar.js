import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-dark bg-dark">

            <div className="container-fluid">

                <span className="navbar-brand">

                    ERP Management System

                </span>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;