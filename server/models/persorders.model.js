//----- Include the required Packages
const mongoose = require('mongoose');

//----- Declare Constant
const mangoSchema = mongoose.Schema;

//----- Blueprint order schema
const persOrdersSchema = new mangoSchema({
    orderId: String,
    fluid: String,
    ycc: String,
    source: String,
    sku: String,
    quantity: String,
    price: String,
    thumbnailImg: String,
    labelImg: String,
    previewImg: String,
    printImg: String,
    labelText1: String,
    labelText2: String,
    commodity: String,
    destination: String,
    labelType: String,

    orchestrator: {
        print_ready_image: String,
    },

    orderstatus: {
        status: String,
    }
});

//----- Export model.
module.exports = mongoose.model('persorders', persOrdersSchema, 'pers_orders');