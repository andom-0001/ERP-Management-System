const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema(
{
    supplier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier",
        required:true
    },

    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },

    quantity:{
        type:Number,
        required:true
    },

    unitPrice:{
        type:Number,
        required:true
    },

    totalPrice:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        enum:["Pending","Approved","Received"],
        default:"Pending"
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "PurchaseOrder",
    purchaseOrderSchema
);