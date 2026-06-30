const mongoose = require("mongoose");

const grnSchema = new mongoose.Schema(
{
    purchaseOrder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PurchaseOrder",
        required:true
    },

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

    receivedQuantity:{
        type:Number,
        required:true
    },

    receivedDate:{
        type:Date,
        default:Date.now
    },

    remarks:{
        type:String,
        default:""
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("GRN", grnSchema);