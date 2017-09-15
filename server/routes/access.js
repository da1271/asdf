var mongoose = require( 'mongoose' );
var Access = require('../models/access.js');
var config = require('../config');

exports.saveaccess = function(req, res, next) {

  const name = req.body.name;
  const description = req.body.description;
  const type = req.body.type;



  if (!name || !type ) {
    return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.'});
  }

  Access.findOne({ name: name }, function(err, existingAccess) {
    if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

    // If access is not unique, return error
    if (existingAccess) {
      return res.status(201).json({
        success: false,
        message: 'Access name already exists.'
      });
    }

    // If no error, create group
    var oAccess = new Access({
      name: name,
      description: description,
      type: type
    });

    oAccess.save(function(err, oAccess) {
      if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

      res.status(201).json({
        success: true,
        message: 'Access created successfully.'
      });
    });
  });
}

exports.updateAccess = function(req, res, next){
  const name = req.body.name;
  const description = req.body.description;
  const type = req.body.type;

  if (!name || !type) {
    return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
  } else {
    Access.findOne({ name: name }.exec(function(err, access){
      if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }

      if(access){
        access.name = name;
        access.description = description;
        access.type = type;
      }
      access.save(function(err){
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); }
        res.status(201).json({
          success: true,
          message: 'Access details updated successfully'
        });
      });
    }));
  }
}

exports.delaccess = function(req, res, next) {
  Access.remove({name: req.params.name}, function(err){
    if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err });
    }
    res.status(201).json({
      success: true,
      message: 'Access removed successfully'
    });
  });
}

exports.getaccess = function(req, res, next){
  Access.find({name:req.params.name}).exec(function(err, access){
    if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err });
    }
    res.status(201).json({
      success: true,
      data: access
    });
  });
}

