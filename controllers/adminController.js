const usermodel = require("../models/usermodel");
//GET DONOR LIST
const getDonorsListController = async (req,res) =>{
try {
    const donorData = await usermodel
    .find({role: "donor"})
    .sort({ createdAt:-1})
    .sort({ lastAccess: -1 });
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
        .sort({ createdAt:-1})
        .sort({ lastAccess: -1 });
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
        .sort({ createdAt:-1})
        .sort({ lastAccess: -1 });
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

     //UPDATE DONOR
     const updateDonorController = async (req,res) =>{
      try {
        const donorId = req.params.id; // Donor ID from the route parameter
        const updatedData = req.body; // Updated data from the request body
    
        // Update donor by ID
        const updatedDonor = await usermodel.findByIdAndUpdate(donorId, updatedData, { new: true });
    
        if (!updatedDonor) {
          return res.status(404).send({
            success: false,
            message: "Donor not found",
          });
        }
    
        return res.status(200).send({
          success: true,
          message: "Donor updated successfully",
          donor: updatedDonor,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).send({
          success: false,
          message: "Error while updating donor",
          error,
        });
      }
  };

   //UPDATE HOSPITAL
   const updateHospitalController = async (req,res) =>{
    try {
      const hospitalId = req.params.id; // Hospital ID from the route parameter
      const updatedData = req.body; // Updated data from the request body
  
      // Update hospital by ID
      const updatedHospital = await usermodel.findByIdAndUpdate(hospitalId, updatedData, { new: true });
  
      if (!updatedHospital) {
        return res.status(404).send({
          success: false,
          message: "Hospital not found",
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "Hospital updated successfully",
        donor: updatedHospital,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Error while updating Hospital",
        error,
      });
    }
};


//UPDATE ORGANIZATION
const updateOrganizationController = async (req,res) =>{
    try {
      const organizationId = req.params.id; // Organization ID from the route parameter
      const updatedData = req.body; // Updated data from the request body
  
      // Update organization by ID
      const updatedOrganization = await usermodel.findByIdAndUpdate(organizationId, updatedData, { new: true });
  
      if (!updatedOrganization) {
        return res.status(404).send({
          success: false,
          message: "Organization not found",
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "Organization updated successfully",
        donor: updatedOrganization,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Error while updating Organization",
        error,
      });
    }
};

    
    
    
    
//Export
module.exports = {getDonorsListController,
    getHospitalListController,
    getOrgListController,deleteDonorController,
    updateDonorController,updateHospitalController,updateOrganizationController
   };