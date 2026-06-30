const Customer = require("../models/Customer");

// Get Customers
const getCustomers = async (req,res)=>{

    try{

        const customers = await Customer.find();

        res.json({
            success:true,
            customers
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

// Get Single Customer
const getCustomer = async(req,res)=>{

    try{

        const customer = await Customer.findById(req.params.id);

        if(!customer){

            return res.status(404).json({
                message:"Customer not found"
            });

        }

        res.json({
            success:true,
            customer
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// Add Customer
const addCustomer = async(req,res)=>{

    try{

        const customer = await Customer.create(req.body);

        res.status(201).json({
            success:true,
            customer
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// Update Customer
const updateCustomer = async(req,res)=>{

    try{

        const customer = await Customer.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );

        res.json({
            success:true,
            customer
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// Delete Customer
const deleteCustomer = async(req,res)=>{

    try{

        await Customer.findByIdAndDelete(req.params.id);

        res.json({
            success:true,
            message:"Customer Deleted"
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports={

    getCustomers,

    getCustomer,

    addCustomer,

    updateCustomer,

    deleteCustomer

};