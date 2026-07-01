const Invoice = require("../models/Invoice");

// Get All Invoices
const getInvoices = async(req,res)=>{

    try{

        const invoices = await Invoice.find()
        .populate({
            path:"salesOrder",
            populate:[
                { path:"customer" },
                { path:"product" }
            ]
        })
        .populate("customer");

        res.json({
            success:true,
            invoices
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

// Get Single Invoice
const getInvoice = async(req,res)=>{

    try{

        const invoice = await Invoice.findById(req.params.id)
        .populate({
            path:"salesOrder",
            populate:[
                { path:"customer" },
                { path:"product" }
            ]
        })
        .populate("customer");

        if(!invoice){

            return res.status(404).json({
                success:false,
                message:"Invoice Not Found"
            });

        }

        res.json({
            success:true,
            invoice
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

// Create Invoice
const createInvoice = async(req,res)=>{

    try{

        const invoice = await Invoice.create(req.body);

        res.status(201).json({
            success:true,
            message:"Invoice Created",
            invoice
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

// Update Payment Status
const updateInvoice = async(req,res)=>{

    try{

        const invoice = await Invoice.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true,
                runValidators:true
            }

        );

        res.json({
            success:true,
            message:"Invoice Updated",
            invoice
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

// Delete Invoice
const deleteInvoice = async(req,res)=>{

    try{

        await Invoice.findByIdAndDelete(req.params.id);

        res.json({
            success:true,
            message:"Invoice Deleted"
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

module.exports={

    getInvoices,

    getInvoice,

    createInvoice,

    updateInvoice,

    deleteInvoice

};