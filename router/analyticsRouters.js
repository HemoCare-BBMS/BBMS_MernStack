const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { bloodGroupDetailsController } = require('../controllers/analyticsController');
const { getInventoryController } = require('../controllers/inventoryController');
const router = express.Router();

//routers



//GET Blood Data
router.get('/bloodGroups-data', authMiddleware, bloodGroupDetailsController);


module.exports = router;
