const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const usermodel = require("../models/usermodel");
//CREATE INVENTORY
const createInventoryController = async (req,res) => {
    try {
        const {email,inventoryType} = req.body
        //validation
        const user = await usermodel.findOne({email});
        if(!user) {

            throw new Error('User Not Found')
        }
        if(inventoryType === "in" && user.role !== 'donor' ){
            throw new Error('Not a donor account');
        }
        if (inventoryType === "out" && user.role !== "hospital") {
            throw new Error("Not a hospital");
        }
        //save record
        const inventory = new inventoryModel(req.body)
        await inventory.save();
        return res.status(201).send({
            success: false,
            message: 'Error In Create Inventory API',
            error,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: "Error in Create Inventory API",
        });
    }
};

module.exports = { createInventoryController };