//----- Import Controller
const ordersController = require ("../controllers/orders.controller");

//----- Include the required Packages
const express = require('express');

//----- Declare Constant
const router = express.Router();

//----- Service
router.route('/')
    //-------- Get /api/posts/ - Get Pers_order entries based on persorderssearchfilter.model.
    .get(ordersController.getPersOrderBySearchFilterModel)

    //------- Post /api/posts/ - Insert pers_order collection from ATG
    .post(ordersController.insertPersOrderByATG);

//----- Export Routes.
module.exports = router;
