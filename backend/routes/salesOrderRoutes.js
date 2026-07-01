const express = require("express");

const router = express.Router();

const {

    getSalesOrders,

    getSalesOrderById,

    addSalesOrder,

    updateSalesOrder,

    deleteSalesOrder

} = require("../controllers/salesOrderController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getSalesOrders);

router.get("/:id", getSalesOrderById);

router.post("/", protect, addSalesOrder);

router.put("/:id", protect, updateSalesOrder);

router.delete("/:id", protect, deleteSalesOrder);

module.exports = router;