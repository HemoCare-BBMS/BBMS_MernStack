const inventoryModel = require("../models/inventoryModel");
const mongoose = require('mongoose')

//GET BLOOD DATA
const bloodGroupDetailsController = async (req,res) =>{
    try {
        const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
        const bloodGroupData = [];
        const organization = new mongoose.Types.ObjectId (req.body.userId);
        //get single blood group
        await Promise.all(bloodGroups.map (async(bloodGroup) =>{
            //Count Total IN
            const totalIn = await inventoryModel.aggregate([
                {$match:{
                    bloodGroup: bloodGroup,
                    inventoryType:'in',
                    organization

                },
            },
                {
                    $group:{
                        _id:null,
                        total: {$sum: '$quantity'},
                    },
                },
            ])

            //Count Total OUT
            const totalOut = await inventoryModel.aggregate([
                {$match:{
                    bloodGroup: bloodGroup,
                    inventoryType:'out',
                    organization

                },
            },
                {
                    $group:{
                        _id:null,
                        total: {$sum: '$quantity'},
                    },
                },
            ])
            //CALCULATE TOTAL
            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0)

            //PUSH DATA
            bloodGroupData.push({
                bloodGroup,
                totalIn: totalIn[0]?.total || 0,
                totalOut: totalOut[0]?.total || 0,
                availableBlood,
            })
        }))

        return res.status(200).send({
            success:true,
            message: 'Blood Group Data Fetched Successfully',
            bloodGroupData,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: "Error In Bloodgroup Data Analytics API",
            error,
        });
    }
};

//GET BLOOD DATA
const AdminbloodGroupDetailsController = async (req,res) =>{
    try {
        const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
        const bloodGroupData = [];
        
        // Process each blood group
    await Promise.all(
        bloodGroups.map(async (bloodGroup) => {
          // Count Total IN
          const totalIn = await inventoryModel.aggregate([
            {
              $match: {
                bloodGroup: bloodGroup,
                inventoryType: "in", // Filter for 'in' inventory type
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$quantity" }, // Sum the quantities
              },
            },
          ]);
  
          // Count Total OUT
          const totalOut = await inventoryModel.aggregate([
            {
              $match: {
                bloodGroup: bloodGroup,
                inventoryType: "out", // Filter for 'out' inventory type
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$quantity" }, // Sum the quantities
              },
            },
          ]);
  
          // Calculate Available Blood
          const availableBlood =
            (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
  
          // Push data
          bloodGroupData.push({
            bloodGroup,
            totalIn: totalIn[0]?.total || 0,
            totalOut: totalOut[0]?.total || 0,
            availableBlood,
          });
        })
      );
  
      return res.status(200).send({
        success: true,
        message: "Blood Group Data Fetched Successfully",
        bloodGroupData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Blood Group Data Analytics API",
        error,
      });
    }
}



module.exports = {bloodGroupDetailsController,AdminbloodGroupDetailsController};