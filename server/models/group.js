const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  group_name: {type:String},
  group_description: {type:String},
  access_list: {type: [] }
  // access_list: {[
  //   "CSC Label Approval": String,
  //   "CSC Manager Label Approval": String,
  //   "Inventory Management": String,
  //   "Label Print": String,
  //   "Quality Control": String,
  //   "Shipping": String,
  //   "Order Management": String,
  //   "User Management": String,
  //   "Group Management": String
  // ]};
});



module.exports = mongoose.model('groups', GroupSchema, 'groups');
