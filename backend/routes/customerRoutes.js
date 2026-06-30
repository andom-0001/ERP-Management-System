const express = require("express");

const router = express.Router();

const {

    getCustomers,

    getCustomer,

    addCustomer,

    updateCustomer,

    deleteCustomer

} = require("../controllers/customerController");

const { protect } = require("../middleware/authMiddleware");

// Public
router.get("/", getCustomers);

router.get("/:id", getCustomer);

// Protected
router.post("/", protect, addCustomer);

router.put("/:id", protect, updateCustomer);

router.delete("/:id", protect, deleteCustomer);

module.exports = router;