const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createInventoryController, getInventoryController } = require('../controllers/inventoryController');
const router = express.Router();

//routers
//ADD INVENTORY || POST
router.post('/create-inventory', authMiddleware, createInventoryController)

//GET ALL BLOOD RECORDS
router.get('/get-inventory', authMiddleware, getInventoryController)

module.exports = router;