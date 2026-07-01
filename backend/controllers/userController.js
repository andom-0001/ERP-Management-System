const User = require("../models/User");

// Get All Users
const getUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.json({
            success: true,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update User Role
const updateUserRole = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(

            req.params.id,

            {
                role: req.body.role
            },

            {
                new: true
            }

        ).select("-password");

        res.json({

            success: true,

            message: "Role Updated",

            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Delete User
const deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);

        res.json({

            success: true,

            message: "User Deleted"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getUsers,

    updateUserRole,

    deleteUser

};