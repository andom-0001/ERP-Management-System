const express = require("express");

const router = express.Router();

const {

    getInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice

} = require("../controllers/invoiceController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getInvoices);

router.get("/:id", getInvoice);

router.post("/", protect, createInvoice);

router.put("/:id", protect, updateInvoice);

router.delete("/:id", protect, deleteInvoice);

module.exports = router;