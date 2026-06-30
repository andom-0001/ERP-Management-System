const express = require("express");

const router = express.Router();

const {

getGRNs,

getGRN,

createGRN,

deleteGRN

}=require("../controllers/grnController");

const { protect } = require("../middleware/authMiddleware");

router.get("/",getGRNs);

router.get("/:id",getGRN);

router.post("/",protect,createGRN);

router.delete("/:id",protect,deleteGRN);

module.exports=router;