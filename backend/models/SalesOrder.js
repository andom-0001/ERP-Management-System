const mongoose = require("mongoose");

const salesOrderSchema = new mongoose.Schema(
{
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
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
        enum:["Pending","Completed","Cancelled"],
        default:"Pending"
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("SalesOrder",salesOrderSchema);