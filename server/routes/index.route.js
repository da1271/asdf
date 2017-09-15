//----- Include the required Packages
const express = require('express');

//----- Declare Constant
const router = express.Router(); // eslint-disable-line new-cap

//----- GET /health-check - Check service health
router.get('/health-check', (req, res) =>
  res.send('OK')
);

//------ mount routes
router.use('/orders', require('./orders.route'));
router.use('/image', require('./image.route'));
router.use('/orderstatus', require('./orderstatus.route'));

//----- Export Routes.
module.exports = router;