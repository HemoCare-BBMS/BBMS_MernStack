const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { bloodGroupDetailsController, AdminbloodGroupDetailsController } = require('../controllers/analyticsController');

const router = express.Router();

//routers



//GET Blood Data
router.get('/bloodGroups-data', authMiddleware, bloodGroupDetailsController);

//GET ADMIN ANALYTICS

router.get('/admin-bloodGroups-data', authMiddleware, AdminbloodGroupDetailsController);



module.exports = router;
