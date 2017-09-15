//----- Import Controller
const orderStatusController = require("../controllers/orderStatus.controller");

//----- Include the required Packages
const express = require('express');

//----- Declare Constant
const router = express.Router();

//----- Service
//-------- Get /api/post - Get orderstatus entries.
router.get('/', orderStatusController.getOrderStatus);

//-------- Get /api/post/:orderId -  the orderstatus entries based on orderid
router.route('/:orderId').get(orderStatusController.getOrderStatusByOrderID);

router.route('/:orderId/:status')
    //------- POST /api/posts/:orderId 
    //-------- Update state in pers_order based on orderid
    //-------- Insert state in orderstatus based on orderid 
    .post(orderStatusController.insertOrderStatus)

    //------- PUT /api/posts/:orderId - Update state in pers_order based on orderid 
    .put(orderStatusController.updateOrderStatus);

//----- Export Routes.
module.exports = router;