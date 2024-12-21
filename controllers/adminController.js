const usermodel = require("../models/usermodel");
//GET DONOR LIST
const getDonorsListController = async (req,res) =>{
try {
    const donorData = await usermodel
    .find({role: "donor"})
    .sort({ createdAt:-1});
    return res.status(200).send({
        success: true,
        Toatlcount: donorData.length,
        message: "Donor List Fetched Successfully",
        donorData,
      });
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message: 'Error In donor List API',
        error,
    });
}      

};
//GET hOSPITAL LIST
const getHospitalListController = async (req,res) =>{
    try {
        const hospitalData = await usermodel
        .find({role: "hospital"})
        .sort({ createdAt:-1});
        return res.status(200).send({
            success: true,
            Toatlcount: hospitalData.length,
            message: "Hospital List Fetched Successfully",
            hospitalData,
          });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: 'Error In hospital List API',
            error,
        });
    }      
    
    };
    //GET ORG LIST
const getOrgListController = async (req,res) =>{
    try {
        const orgData = await usermodel
        .find({role: "organization"})
        .sort({ createdAt:-1});
        return res.status(200).send({
            success: true,
            Toatlcount: orgData.length,
            message: "Org List Fetched Successfully",
            orgData,
          });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message: 'Error In Org List API',
            error,
        });
    }      
    
    };
    //===========

    //DELETE DONOR
    const deleteDonorController = async (req,res) =>{
        try {
            await usermodel.findByIdAndDelete(req.params.id)
            return res.status(200).send({
                success: true,
                message: " Deleted Successfully",
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success:false,
                message:'Error while deleting ',
                error,
            })
        }
    };

   
    
    
    
    
//Export
module.exports = {getDonorsListController,
    getHospitalListController,
    getOrgListController,deleteDonorController,
   };