const Product = require("../models/Product");

// Get All Products
const getProducts = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const search = req.query.search || "";
        const category = req.query.category || "";
        const sort = req.query.sort || "createdAt";

        const query = {};

        // Search by Title
        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by Category
        if (category) {
            query.category = category;
        }

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            success: true,
            page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Product By ID
const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Add Product
const addProduct = async (req, res) => {

    try {

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Product
const updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product Updated",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Product
const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.deleteOne();

        res.json({
            success: true,
            message: "Product Deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};