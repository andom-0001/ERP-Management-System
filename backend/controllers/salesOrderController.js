const SalesOrder = require("../models/SalesOrder");

// Get All Sales Orders
const getSalesOrders = async(req,res)=>{

    try{

        const salesOrders = await SalesOrder.find()

        .populate("customer")

        .populate("product");

        res.json({

            success:true,

            salesOrders

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Get Single Sales Order

const getSalesOrderById = async(req,res)=>{

    try{

        const salesOrder = await SalesOrder.findById(req.params.id)

        .populate("customer")

        .populate("product");

        if(!salesOrder){

            return res.status(404).json({

                success:false,

                message:"Sales Order Not Found"

            });

        }

        res.json({

            success:true,

            salesOrder

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Add Sales Order

const addSalesOrder = async(req,res)=>{

    try{

        const salesOrder = await SalesOrder.create(req.body);

        res.status(201).json({

            success:true,

            message:"Sales Order Created",

            salesOrder

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Update Sales Order

const updateSalesOrder = async(req,res)=>{

    try{

        const salesOrder = await SalesOrder.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true,
                runValidators:true
            }

        );

        res.json({

            success:true,

            message:"Sales Order Updated",

            salesOrder

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Delete Sales Order

const deleteSalesOrder = async(req,res)=>{

    try{

        await SalesOrder.findByIdAndDelete(req.params.id);

        res.json({

            success:true,

            message:"Sales Order Deleted"

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

module.exports={

    getSalesOrders,

    getSalesOrderById,

    addSalesOrder,

    updateSalesOrder,

    deleteSalesOrder

};