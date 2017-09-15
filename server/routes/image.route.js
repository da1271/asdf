//----- Import Controller
const imageController = require("../controllers/image.controller");

//----- Include the required Packages
const express = require('express');

//----- Declare Constant
const router = express.Router();

//----- Service
//------- Post /api/posts/ - Create print ready image based on Picketd Ticket and Pers_order details.
router.post('/', imageController.createPrintReadyImageWithPickTicket);

//------- Post /api/posts/save - Save the print ready image in Amazon S3 backut and upate the URL in Pers_order.
router.post('/save', imageController.savePrintReadyImageAndUpateURL);

//----- Export Routes.
module.exports = router;