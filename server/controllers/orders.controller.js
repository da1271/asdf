//----- Import Controller
const persOrdersModel = require("../models/persorders.model");

//----- Busniess Layer
//-------- Get Pers_order entries based on persorderssearchfilter.model. 
function getPersOrderBySearchFilterModel(req, res) {
    persOrdersModel.find({ order_id: req.params.orderId }).exec()
        .then(function(orderStatusList) {
            res.json(orderStatusList);
        })
        .catch(function() {
            console.log("Error on retrieving");
        });
};

//-------- Insert pers_order collection from ATG 
function insertPersOrderByATG(req, res) {
    var tempPersOrdersModel = new persOrdersModel();

    tempPersOrdersModel.orderId = req.body.orderId;
    tempPersOrdersModel.fluid = req.body.fluid;
    tempPersOrdersModel.ycc = req.body.ycc;
    tempPersOrdersModel.source = req.body.source;
    tempPersOrdersModel.sku = req.body.sku;
    tempPersOrdersModel.quantity = req.body.quantity;
    tempPersOrdersModel.price = req.body.price;
    tempPersOrdersModel.thumbnailImg = req.body.thumbnailImg;
    tempPersOrdersModel.labelImg = req.body.labelImg;
    tempPersOrdersModel.previewImg = req.body.previewImg;
    tempPersOrdersModel.printImg = req.body.printImg;
    tempPersOrdersModel.labelText1 = req.body.labelText1;
    tempPersOrdersModel.labelText2 = req.body.labelText2;
    tempPersOrdersModel.commodity = req.body.commodity;
    tempPersOrdersModel.destination = req.body.destination;
    tempPersOrdersModel.labelType = req.body.labelType;
    tempPersOrdersModel.$addToSet = {
        orchestrator: { print_ready_image: 't' },
        orderstatus: { status: 'under process' }
    };
    console.log(tempPersOrdersModel);
    tempPersOrdersModel.save()
        .then(function(insertedPersOrder) {
            res.json(insertedPersOrder);
        })
        .catch(function(err) {
            console.log('error:', err);
            res.send('Inserted failed due to ' + err);
        });
}

//----- Export Routes.
module.exports = { getPersOrderBySearchFilterModel, insertPersOrderByATG };