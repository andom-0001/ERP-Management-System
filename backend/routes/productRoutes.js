const express = require("express");
const router = express.Router();

const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");


const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Public Routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected Routes
router.post("/", protect, addProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect,authorize("Admin"), deleteProduct);

module.exports = router;