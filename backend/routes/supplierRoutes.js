const express = require("express");

const router = express.Router();

const {

    getSuppliers,
    getSupplierById,
    addSupplier,
    updateSupplier,
    deleteSupplier

} = require("../controllers/supplierController");

const { protect } = require("../middleware/authMiddleware");

// Public Routes

router.get("/", getSuppliers);

router.get("/:id", getSupplierById);

// Protected Routes

router.post("/", protect, addSupplier);

router.put("/:id", protect, updateSupplier);

router.delete("/:id", protect, deleteSupplier);

module.exports = router;