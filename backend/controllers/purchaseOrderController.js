const PurchaseOrder = require("../models/PurchaseOrder");

// Get All Purchase Orders
const getPurchaseOrders = async(req,res)=>{

    try{

        const purchaseOrders = await PurchaseOrder.find()
        .populate("supplier")
        .populate("product");

        res.json({
            success:true,
            purchaseOrders
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

// Get Single Purchase Order
const getPurchaseOrderById = async(req,res)=>{

    try{

        const purchaseOrder = await PurchaseOrder.findById(req.params.id)
        .populate("supplier")
        .populate("product");

        if(!purchaseOrder){

            return res.status(404).json({
                success:false,
                message:"Purchase Order Not Found"
            });

        }

        res.json({
            success:true,
            purchaseOrder
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

// Add Purchase Order
const addPurchaseOrder = async(req,res)=>{

    try{

        const purchaseOrder = await PurchaseOrder.create(req.body);

        res.status(201).json({

            success:true,

            message:"Purchase Order Created",

            purchaseOrder

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Update Purchase Order
const updatePurchaseOrder = async(req,res)=>{

    try{

        const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true,
                runValidators:true
            }

        );

        res.json({

            success:true,

            message:"Purchase Order Updated",

            purchaseOrder

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Delete Purchase Order
const deletePurchaseOrder = async(req,res)=>{

    try{

        await PurchaseOrder.findByIdAndDelete(req.params.id);

        res.json({

            success:true,

            message:"Purchase Order Deleted"

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

module.exports={

    getPurchaseOrders,

    getPurchaseOrderById,

    addPurchaseOrder,

    updatePurchaseOrder,

    deletePurchaseOrder

};