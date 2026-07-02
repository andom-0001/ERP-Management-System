const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Supplier = require("../models/Supplier");
const PurchaseOrder = require("../models/PurchaseOrder");
const SalesOrder = require("../models/SalesOrder");

// Dashboard Report
const getDashboardReport = async (req, res) => {

    try {

        const products = await Product.countDocuments();

        const customers = await Customer.countDocuments();

        const suppliers = await Supplier.countDocuments();

        const purchaseOrders = await PurchaseOrder.countDocuments();

        const salesOrders = await SalesOrder.countDocuments();

        res.json({

            success: true,

            report: {

                products,

                customers,

                suppliers,

                purchaseOrders,

                salesOrders

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Inventory Report
const getInventoryReport = async (req, res) => {

    try {

        const products = await Product.find();

        res.json({

            success: true,

            products

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Sales Report
const getSalesReport = async (req, res) => {

    try {

        const sales = await SalesOrder.find()

        .populate("customer")

        .populate("product");

        res.json({

            success: true,

            sales

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Purchase Report
const getPurchaseReport = async (req, res) => {

    try {

        const purchases = await PurchaseOrder.find()

        .populate("supplier")

        .populate("product");

        res.json({

            success: true,

            purchases

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getDashboardReport,

    getInventoryReport,

    getSalesReport,

    getPurchaseReport

};