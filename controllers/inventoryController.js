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
            message: 'New Blood Record Added',
            
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: "Error in Create Inventory API",
            error,
        });
    }
};
//GET ALL BLOOD RECORDS
const getInventoryController = async (req,res) => {
    try {
        const inventory = await inventoryModel.find({organization:req.body.userId,}).populate('donor').populate('hospital').sort({createdAt: -1});
        return res.status(200).send({
            success: true,
            message: 'get All Records Successfully',
            inventory,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success :false,
            message :"Error in Get All Inventory ",
            error
        })

    }
};

module.exports = { createInventoryController,getInventoryController};