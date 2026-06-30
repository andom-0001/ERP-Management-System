import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const res = await API.get("/users/profile");

            setUser(res.data.user);

        } catch (error) {

            console.log(error);

        }

    };

    if (!user) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }

    return (

        <>

            <Navbar />

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-2">

                        <Sidebar />

                    </div>

                    <div className="col-md-10">

                        <div className="card mt-5 shadow">

                            <div className="card-header bg-primary text-white">

                                <h3>User Profile</h3>

                            </div>

                            <div className="card-body">

                                <table className="table">

                                    <tbody>

                                        <tr>

                                            <th>Name</th>

                                            <td>{user.name}</td>

                                        </tr>

                                        <tr>

                                            <th>Email</th>

                                            <td>{user.email}</td>

                                        </tr>

                                        <tr>

                                            <th>Role</th>

                                            <td>{user.role}</td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Profile;