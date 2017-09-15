var mongoose = require( 'mongoose' );
var Group = require('../models/group.js');
var config = require('../config');

exports.savegroup = function(req, res, next) {

  const group_name = req.body.group_name;
  const group_description = req.body.group_description;
  const access_list = req.body.access_list;



  if (!group_name || !access_list) {
    return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.'});
  }

  Group.findOne({ group_name: group_name }, function(err, existingGroup) {
    if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

    // If group is not unique, return error
    if (existingGroup) {
      return res.status(201).json({
        success: false,
        message: 'Groupname already exists.'
      });
    }

    // If no error, create group
    var oGroup = new Group({
      group_name: group_name,
      group_description: group_description,
      access_list: access_list
    });

    oGroup.save(function(err, oGroup) {
      if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

      res.status(201).json({
        success: true,
        message: 'Group created successfully, please login to access your account.'
      });
    });
  });
}

exports.updateGroup = function(req, res, next){
  const group_name = req.body.group_name;
  const group_description = req.body.group_description;
  const access_list = req.body.access_list;

  if (!group_name) {
    return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
  } else {
    Group.findOne({ _id: req.params._id }).exec(function(err, group){
      if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }

      if(group){
        group.group_name = group_name;
        group.group_description = group_description;
        group.access_list = access_list;
      }
      group.save(function(err){
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); }
        res.status(201).json({
          success: true,
          message: 'Group details updated successfully'
        });
      });
    });
  }
}

exports.delgroup = function(req, res, next) {
  Group.remove({_id: req.params._id}, function(err){
    if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err });
    }
    res.status(201).json({
      success: true,
      message: 'Group removed successfully'
    });
  });
}

exports.getgroup = function(req, res, next){
  Group.find({_id:req.params._id}).exec(function(err, group){
    if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err });
    }
    res.status(201).json({
      success: true,
      data: group
    });
  });
}

exports.getgroups= function(req, res, next){
  Group.find().exec(function(err, group){
    if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }
    res.status(201).json({
      success: true,
      data: group
    });
  });
}
