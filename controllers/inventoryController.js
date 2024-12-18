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
       // if(inventoryType === "in" && user.role !== 'donor' ){
       //     throw new Error('Not a donor account');
       // }
      //  if (inventoryType === "out" && user.role !== "hospital") {
       //     throw new Error("Not a hospital");
      //  }

      if(req.body.inventoryType == 'out'){
        const requestedBloodGroup = req.body.bloodGroup;
        const requestedQuantityOfBlood = req.body.quantity;
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        //calculate blood quantity
        const totalInOfRequstedBlood = await inventoryModel.aggregate([
            {$match:{
                organization,
                inventoryType:'in',
                bloodGroup:requestedBloodGroup
            },
        },
        {
                $group:{
                    _id:'$bloodGroup',
                    total:{$sum : '$quantity'}
                },
            },
        ]);
        //console.log("Total In",totalInOfRequstedBlood);
        const totalIn = totalInOfRequstedBlood[0]?.total || 0;
        //Calculate Out Blood Quantity
        const totalOutOfRequstedBloodGroup = await inventoryModel.aggregate([
            {$match:{
                organization,
                inventoryType:'out',
                bloodGroup:requestedBloodGroup
            },
        },
        {
            $group:{
                _id:'$bloodGroup',
                total:{$sum : '$quantity'}
            }
        }
        ])
        const totalOut = totalOutOfRequstedBloodGroup[0]?.total || 0;
        
        //in & out Calc
        const availableQuantityOfBloodGroup = totalIn - totalOut
      //quantity validation
      if(availableQuantityOfBloodGroup < requestedQuantityOfBlood){
        return res.status(500).send({
            success:false,
            message:`Only ${availableQuantityOfBloodGroup}ml of ${requestedBloodGroup.toUpperCase()} is available`
        })
      }
      req.body.hospital = user?._id;
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