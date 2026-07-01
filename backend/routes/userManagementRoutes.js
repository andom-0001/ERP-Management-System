const express = require("express");

const router = express.Router();

const {

    getUsers,

    updateUserRole,

    deleteUser

} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getUsers);

router.put("/:id", protect, updateUserRole);

router.delete("/:id", protect, deleteUser);

module.exports = router;