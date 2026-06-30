const express = require("express");

const router = express.Router();

const {

    getPurchaseOrders,
    getPurchaseOrderById,
    addPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder

} = require("../controllers/purchaseOrderController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getPurchaseOrders);

router.get("/:id", getPurchaseOrderById);

router.post("/", protect, addPurchaseOrder);

router.put("/:id", protect, updatePurchaseOrder);

router.delete("/:id", protect, deletePurchaseOrder);

module.exports = router;