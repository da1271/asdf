//----- Import Controller
const persOrdersModel = require("../models/persorders.model");
const orderStatusModel = require("../models/orderstatus.model");

//----- Busniess Layer
//-------- Get the orderstatus entries
function getOrderStatus(req, res) {
    orderStatusModel.find({}).exec()
        .then(function(orderStatusList) {
            res.json(orderStatusList);
        })
        .catch(function() {
            console.log("Error on retrieving");
        });
}

//-------- Get the orderstatus entries based on orderid 
function getOrderStatusByOrderID(req, res) {
    orderStatusModel.find({ orderId: req.params.orderId }).exec()
        .then(function(orderStatusList) {
            res.json(orderStatusList);
        })
        .catch(function() {
            console.log("Error on retrieving");
        });
};

//-------- Insert state in orderstatus based on orderid
function insertOrderStatus(req, res) {
    var orderID = req.params.orderId,
        newState = req.params.orderStatus;

    /// update pers_order with new status
    updatePers_OrderStatus(orderID, newState)
        .then(function(updatedOrder) {
            /// insert new status into orderstatus collection 
            var newOrderStatusEntry = new orderStatusModel();
            newOrderStatusEntry.orderId = updatedOrder.orderId;
            newOrderStatusEntry.orderStatus = 'approve'; // updatedOrder.orderStatus;
            newOrderStatusEntry.user = "";
            newOrderStatusEntry.modifiedDate = Date.now(); //updatedOrder.modifiedDate;
            return newOrderStatusEntry.save();
        })
        .then(function(statusEntry) {
            res.json(statusEntry);
        })
        .catch(function(err) {
            console.log('error:', err);
            res.send('Update failed due to ' + err);
        });
};

//-------- Update state in pers_order based on orderid  
function updateOrderStatus(req, res) {
    var orderID = req.params.orderId,
        newState = req.params.orderStatus;

    updatePers_OrderStatus(orderID, newState)
        .then(function(updatedOrder) {
            res.json(updatedOrder);
        })
        .catch(function(err) {
            console.log('error:', err);
            res.send('Update failed due to ' + err);
        });

};

//-------- Update state in pers_order based on orderid
function updatePers_OrderStatus(orderId, orderStatus) {
    // returns promise
    return persOrdersModel.findOneAndUpdate({ orderId: orderId }, {
        $set: { orderStatus: orderStatus, modifiedDate: Date.now() }
    }, {
        new: true,
        upsert: true // temp setting to add new item to collection
    }).exec();
}

//----- Export Routes.
module.exports = { getOrderStatus, getOrderStatusByOrderID, insertOrderStatus, updateOrderStatus };