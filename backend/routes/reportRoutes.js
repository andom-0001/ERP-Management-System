const express = require("express");

const router = express.Router();

const {

    getDashboardReport,

    getInventoryReport,

    getSalesReport,

    getPurchaseReport

} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");

router.get("/dashboard", protect, getDashboardReport);

router.get("/inventory", protect, getInventoryReport);

router.get("/sales", protect, getSalesReport);

router.get("/purchase", protect, getPurchaseReport);

module.exports = router;