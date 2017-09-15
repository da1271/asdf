//----- Include the required Packages
const mongoose = require('mongoose');

//----- Declare Constant
const mangoSchema = mongoose.Schema;

//----- Blueprint order schema
const orderStatusSchema = new mangoSchema({
    orderId: String,
    orderStatus: String,
    user : String,
    modifiedDate: Date
});

//----- Export model.
module.exports = mongoose.model('orderStatusDetail', orderStatusSchema, 'orderstatus');