const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
{
    salesOrder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SalesOrder",
        required:true
    },

    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        required:true
    },

    subtotal:{
        type:Number,
        required:true
    },

    tax:{
        type:Number,
        default:18
    },

    totalAmount:{
        type:Number,
        required:true
    },

    paymentStatus:{
        type:String,
        enum:["Pending","Paid"],
        default:"Pending"
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Invoice", invoiceSchema);