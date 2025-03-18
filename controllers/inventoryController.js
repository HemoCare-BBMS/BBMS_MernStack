const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const usermodel = require("../models/usermodel");
//CREATE INVENTORY
const createInventoryController = async (req,res) => {
    try {
        const {email} = req.body;
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
    }else{
        req.body.donor = user?._id;
    }
        //save record
        const inventory = new inventoryModel(req.body)
        await inventory.save();
        return res.status(201).send({
            success: true,
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
// GET ALL BLOOD RECORS
const getInventoryController = async (req, res) => {
    try {
      const inventory = await inventoryModel
        .find({
          organization: req.body.userId,
        })
        .populate("donor")
        .populate("hospital")
        .sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        messaage: "get all records successfully",
        inventory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Get All Inventory",
        error,
      });
    }
  };

  //GET ALL BLOOD RECORDS IN ADMIN PAGE
  const getInventoryControllerAdmin = async (req, res) => {
    try {
        const inventory = await inventoryModel

            .find({})
            .populate("donor") // Populate donor details
            .populate("hospital") // Populate hospital details
            .sort({ createdAt: -1 }); 
                
        return res.status(200).send({
          success: true,
          messaage: "get all records successfully",
          inventory,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Error In Get All Inventory",
          error,
        });
      }
  }

//GET HOSPITAL BLOOD RECORDS
const getInventoryHospitalController = async (req,res) => {
    try {
        const inventory = await inventoryModel
        .find(req.body.filters)
        .populate('donor')
        .populate('hospital')
        .populate('organization')
        .sort({createdAt: -1});
        return res.status(200).send({
            success: true,
            message: 'get Hospital consumer Records Successfully',
            inventory,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success :false,
            message :"Error in Get consumer Inventory ",
            error
        })

    }
};
//GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req,res) =>{
    try {
        const inventory = await inventoryModel.find({
            organization:req.body.userId,
        }).limit(3).sort({createdAt: -1})
        return res.status(200).send({
            success:true,
            message: 'get Recent Inventory Successfully',
            inventory,
        })
    } catch (error) {
       console.log(error) 
       return res.status(500).send({
        success :false,
        message :"Error in Get Recent Inventory API",
        error,
       })
    }
}
//GET DONOR RECORD
const getDonorsController = async (req,res) => {
    try {
       const organization = req.body.userId;
       //find donors
       const donorId = await inventoryModel.distinct("donor",{
        organization,
       });

       // console.log(donorId);
       const donors = await usermodel.find({_id: {$in: donorId}});
       return res.status(200).send({
            success:true,
            message: 'Donors Record Fetched Successfully',
            donors,
       })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success :false,
            message :"Error in Donors record ",
            error,
        })
    }
};

//GET HOSPITAL RECORD
const getHospitalController = async (req,res) =>{
   try {
    const organization = req.body.userId;
    //GET HOSPITAL ID
    const hospitalId = await inventoryModel.distinct("hospital",{organization,});
    //FIND HOSPITAL
    const hospitals = await usermodel.find({
        _id:{$in: hospitalId}
    })
    return res.status(200).send({
        success:true,
        message: 'Hospitals Record Fetched Successfully',
        hospitals,
    })
   } catch (error) {
    console.log(error)
    return res.status(500).send({
        success :false,
        message :"Error in Get Hospital API ",
        error,
    })
   }
};
//GET ORGANIZATION PROFILE
const getOrganizationController = async (req,res) =>{
    try {
        const donor = req.body.userId;
        const orgId = await inventoryModel.distinct('organization',{donor,})
        //find org
        const organizations = await usermodel.find({
            _id:{$in: orgId}
        });
        return res.status(200).send({
            success:true,
            message:'Organization Data Fetched Successfuly',
            organizations,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success :false,
            message:"Error In Organization API",
            error,
        });
    }
};
//GET ORGANIZATION FOR HOSPITAL
const getOrganizationForHospitalController = async (req,res) =>{
    try {
        const hospital = req.body.userId
        const orgId = await inventoryModel.distinct('organization',{hospital})
        //find org
        const organizations = await usermodel.find({
            _id:{$in: orgId}
        });
        return res.status(200).send({
            success:true,
            message:'Hospital & Organization Data Fetched Successfuly',
            organizations,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success :false,
            message:"Error In Hospital & Organization API",
            error,
        });
    }
};

//GET BLOOD RECORD OF 3
const getAdminRecentInventoryController = async (req,res) =>{
    try {
        const inventory = await inventoryModel
        
        .find({})
        .populate("donor") // Populate donor details
        .populate("hospital") // Populate hospital details
        .limit(5)
        .sort({createdAt: -1});
        return res.status(200).send({
            success:true,
            message: 'get Recent Inventory Successfully',
            inventory,
        })
    } catch (error) {
       console.log(error) 
       return res.status(500).send({
        success :false,
        message :"Error in Get Recent Inventory API",
        error,
       })
    }
}
module.exports = { createInventoryController,
    getInventoryController,
    getDonorsController,
    getHospitalController,
    getOrganizationController,
    getOrganizationForHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController,
    getInventoryControllerAdmin,
    getAdminRecentInventoryController};