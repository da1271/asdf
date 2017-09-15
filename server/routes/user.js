var mongoose = require( 'mongoose' );
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');
//var Group = require('./group.js');


exports.signup = function(req, res, next){
  // Check for registration errors
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const group_name = req.body.group_name;

  if (!firstname || !lastname || !email || !username || !password || !group_name ) {
    return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.'});
  }

  User.findOne({ username: username }, function(err, existingUser) {
    if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(201).json({
        success: false,
        message: 'Username already exists.'
      });
    }

    // If no error, create account
    var oUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: password,
      group_name: group_name
    });

    // oUser.aggregate([
    //   {
    //     $lookup: {
    //       from: 'groups',
    //       localField: 'group_name',
    //       foreignField: 'group_name',
    //       as: 'usersgroup'
    //     }
    //   }
    // ]);

    oUser.save(function(err, oUser) {
      if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

      res.status(201).json({
        success: true,
        message: 'User created successfully, please login to access your account.'
      });
    });
  });
}

exports.login = function(req, res, next){
  // find the user
  User.findOne({ username: req.body.username }, function(err, user) {
    if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

    if (!user) {
      res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
    }else if (user) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user, config.secret, {
            expiresIn: config.tokenexp
          });

          var last_login = user.lastlogin;

          // login success update last login
          user.lastlogin = new Date();


          user.save(function(err) {
            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

            res.status(201).json({
              success: true,
              message: {'userid': user._id, 'username': user.username, 'firstname': user.firstname, 'lastlogin': last_login},
              token: token
            });
          });
        } else {
          res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
        }
      });
    }
  });
}

exports.authenticate = function(req, res, next){
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['authorization'];
  //console.log(token);
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(201).json({ success: false, message: 'Authenticate token expired, please login again.', errcode: 'exp-token' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(201).json({
      success: false,
      message: 'Fatal error, Authenticate token not available.',
      errcode: 'no-token'
    });
  }
}

exports.getuserDetails = function(req, res, next){
  User.find({_id:req.params.id}).exec(function(err, user){
    if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }
    res.status(201).json({
      success: true,
      data: user
    });
  });
}

exports.getusersDetails = function(req, res, next){
  User.find().exec(function(err, user){
    if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }
    res.status(201).json({
      success: true,
      data: user
    });
  });
}

exports.deluserDetails = function(req, res, next){
  User.remove({_id:req.params.id}).exec(function(err, user){
    if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }
    res.status(201).json({
      success: true,
      data: user
    });
  });
}

exports.updateUser = function(req, res, next){
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const userid = req.params.id;
  const group_name = req.body.group_name;

  if (!firstname || !lastname || !email || !userid || !group_name) {
    return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
  } else {
    User.findById(userid).exec(function(err, user){
      if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }

      if(user){
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.group_name = group_name;
      }
      user.save(function(err){
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); }
        res.status(201).json({
          success: true,
          message: 'User details updated successfully'
        });
      });
    });
  }
}

exports.updatePassword = function(req, res, next){
  const userid = req.params.id;
  const oldpassword = req.body.oldpassword;
  const password = req.body.password;

  if (!oldpassword || !password || !userid) {
    return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
  } else {

    User.findOne({ _id: userid }, function(err, user) {
      if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
      if (user) {
        user.comparePassword(oldpassword, function (err, isMatch) {
          if (isMatch && !err) {

            user.password = password;

            user.save(function(err) {
              if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

              res.status(201).json({
                success: true,
                message: 'Password updated successfully'
              });
            });
          } else {
            res.status(201).json({ success: false, message: 'Incorrect old password.' });
          }
        });
      }
    });
  }
}

exports.authorization = function(req, res, next){

  const screen_name = req.body.screen_name;
  // find the user
  User.findOne({ username: req.body.username }, function(err, user) {
    if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

    if (!user) {
      res.status(201).json({ success: false, message: 'Incorrect authorization credentials.' });
    }else if (user) {

      //authorization
      if (user.usersgroup.access_list.indexOf(screen_name) !== -1) {



        var last_login = user.lastlogin;

        // login success update last login
        user.lastlogin = new Date();
      }


      user.save(function(err) {
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

        res.status(201).json({
          success: true,
          message: {'userid': user._id, 'username': user.username, 'firstname': user.firstname, 'lastlogin': last_login},

        });
      });

    } else {
      res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
    }

  });
}

//mongo "mongodb://yccuk-shard-00-00-ppzu1.mongodb.net:27017,yccuk-shard-00-01-ppzu1.mongodb.net:27017,yccuk-shard-00-02-ppzu1.mongodb.net:27017/test?replicaSet=YCCUK-shard-0" --authenticationDatabase admin --ssl --username doyleahn --password doyleahn1
//mongo "mongodb://yccuk-shard-00-00-ppzu1.mongodb.net:27017,yccuk-shard-00-01-ppzu1.mongodb.net:27017,yccuk-shard-00-02-ppzu1.mongodb.net:27017/test?replicaSet=YCCUK-shard-0" --authenticationDatabase admin --ssl --username doyleahn --password doyleahn1
