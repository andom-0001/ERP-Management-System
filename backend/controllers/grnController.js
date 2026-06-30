const GRN = require("../models/GRN");
const Product = require("../models/Product");
const PurchaseOrder = require("../models/PurchaseOrder");

// Get All GRNs

const getGRNs = async(req,res)=>{

    try{

        const grns = await GRN.find()

        .populate("purchaseOrder")

        .populate("supplier")

        .populate("product");

        res.json({

            success:true,

            grns

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Get Single GRN

const getGRN = async(req,res)=>{

    try{

        const grn = await GRN.findById(req.params.id)

        .populate("purchaseOrder")

        .populate("supplier")

        .populate("product");

        res.json({

            success:true,

            grn

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Create GRN

const createGRN = async(req,res)=>{

    try{

        const {

            purchaseOrder,

            supplier,

            product,

            receivedQuantity,

            remarks

        } = req.body;

        const grn = await GRN.create({

            purchaseOrder,

            supplier,

            product,

            receivedQuantity,

            remarks

        });

        // Increase Product Stock

        const productData = await Product.findById(product);

        productData.stock += Number(receivedQuantity);

        await productData.save();

        // Update Purchase Order Status

        await PurchaseOrder.findByIdAndUpdate(

            purchaseOrder,

            {

                status:"Received"

            }

        );

        res.status(201).json({

            success:true,

            message:"GRN Created",

            grn

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// Delete GRN

const deleteGRN = async(req,res)=>{

    try{

        await GRN.findByIdAndDelete(req.params.id);

        res.json({

            success:true,

            message:"GRN Deleted"

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

    getGRNs,

    getGRN,

    createGRN,

    deleteGRN

};