const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getDonorsListController, getHospitalListController, getOrgListController, deleteDonorController } = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
//ROUTER OBJECT
const router = express.Router();
//Routers

//GET || DONOR LIST
router.get('/donor-list', authMiddleware,adminMiddleware, getDonorsListController);

//GET || HOSPITAL LIST
router.get('/hospital-list', authMiddleware,adminMiddleware, getHospitalListController);

//export//GET || HOSPITAL LIST
router.get('/org-list', authMiddleware,adminMiddleware, getOrgListController);

//=======
//DELETE DONOR || GET
router.delete('/delete-donor/:id', authMiddleware,adminMiddleware, deleteDonorController);

module.exports = router;