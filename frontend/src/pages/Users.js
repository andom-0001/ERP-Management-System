import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const res = await API.get("/users");

            setUsers(res.data.users);

        } catch (error) {

            console.log(error);

        }

    };

    const updateRole = async (id, role) => {

        try {

            await API.put(`/users/${id}`, {

                role

            });

            fetchUsers();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const deleteUser = async (id) => {

        if (!window.confirm("Delete User?"))
            return;

        try {

            await API.delete(`/users/${id}`);

            fetchUsers();

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

                        <div className="mt-4">

                            <h2>User Management</h2>

                        </div>

                        <table className="table table-bordered table-hover mt-4">

                            <thead className="table-dark">

                                <tr>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Role</th>

                                    <th>Status</th>

                                    <th width="120">

                                        Action

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    users.length > 0 ?

                                    users.map(user => (

                                        <tr key={user._id}>

                                            <td>

                                                {user.name}

                                            </td>

                                            <td>

                                                {user.email}

                                            </td>

                                            <td>

                                                <select

                                                    className="form-select"

                                                    value={user.role}

                                                    onChange={(e)=>

                                                        updateRole(

                                                            user._id,

                                                            e.target.value

                                                        )

                                                    }

                                                >

                                                    <option>

                                                        Admin

                                                    </option>

                                                    <option>

                                                        Manager

                                                    </option>

                                                    <option>

                                                        Employee

                                                    </option>

                                                </select>

                                            </td>

                                            <td>

                                                {

                                                    user.isActive ?

                                                    <span className="badge bg-success">

                                                        Active

                                                    </span>

                                                    :

                                                    <span className="badge bg-danger">

                                                        Inactive

                                                    </span>

                                                }

                                            </td>

                                            <td>

                                                <button

                                                    className="btn btn-danger btn-sm"

                                                    onClick={()=>

                                                        deleteUser(user._id)

                                                    }

                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center"
                                        >

                                            No Users Found

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

export default Users;