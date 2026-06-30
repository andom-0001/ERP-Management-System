import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";
import Suppliers from "./pages/Suppliers";
import AddSupplier from "./pages/AddSupplier";
import EditSupplier from "./pages/EditSupplier";
import PurchaseOrders from "./pages/PurchaseOrders";
import AddPurchaseOrder from "./pages/AddPurchaseOrder";
import EditPurchaseOrder from "./pages/EditPurchaseOrder";
import GRNs from "./pages/GRNs";
import AddGRN from "./pages/AddGRN";
import PrivateRoute from "./components/PrivateRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <PrivateRoute>
                            <Products />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products/add"
                    element={
                        <PrivateRoute>
                            <AddProduct />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditProduct />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/customers"
                    element={
                        <PrivateRoute>
                            <Customers />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customers/add"
                    element={
                        <PrivateRoute>
                            <AddCustomer />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customers/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditCustomer />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/suppliers"
                    element={
                        <PrivateRoute>
                            <Suppliers />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/suppliers/add"
                    element={
                        <PrivateRoute>
                            <AddSupplier />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/suppliers/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditSupplier />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/purchase-orders"
                    element={
                        <PrivateRoute>
                            <PurchaseOrders />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/purchase-orders/add"
                    element={
                        <PrivateRoute>
                            <AddPurchaseOrder />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/purchase-orders/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditPurchaseOrder />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/grns"
                    element={
                        <PrivateRoute>
                            <GRNs />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/grns/add"
                    element={
                        <PrivateRoute>
                            <AddGRN />
                        </PrivateRoute>
                    }
                />  

                <Route path="*" element={<Login />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;