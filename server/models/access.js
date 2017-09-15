const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessSchema = new Schema({
  name: {type:String},
  description: {type:String},
  type: {type: String }

});



module.exports = mongoose.model('access', AccessSchema, 'access');
