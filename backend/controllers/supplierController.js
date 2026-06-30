const Supplier = require("../models/Supplier");

// Get All Suppliers
const getSuppliers = async (req, res) => {

    try {

        const suppliers = await Supplier.find();

        res.json({
            success: true,
            suppliers
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Single Supplier
const getSupplierById = async (req, res) => {

    try {

        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {

            return res.status(404).json({
                success:false,
                message:"Supplier Not Found"
            });

        }

        res.json({
            success:true,
            supplier
        });

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

// Add Supplier
const addSupplier = async (req, res) => {

    try {

        const supplier = await Supplier.create(req.body);

        res.status(201).json({
            success:true,
            message:"Supplier Added",
            supplier
        });

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

// Update Supplier
const updateSupplier = async (req, res) => {

    try {

        const supplier = await Supplier.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true,
                runValidators:true
            }

        );

        if(!supplier){

            return res.status(404).json({

                success:false,

                message:"Supplier Not Found"

            });

        }

        res.json({

            success:true,

            message:"Supplier Updated",

            supplier

        });

    } catch (error) {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Delete Supplier
const deleteSupplier = async (req, res) => {

    try {

        const supplier = await Supplier.findById(req.params.id);

        if(!supplier){

            return res.status(404).json({

                success:false,

                message:"Supplier Not Found"

            });

        }

        await supplier.deleteOne();

        res.json({

            success:true,

            message:"Supplier Deleted"

        });

    } catch (error) {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

module.exports = {

    getSuppliers,

    getSupplierById,

    addSupplier,

    updateSupplier,

    deleteSupplier

};