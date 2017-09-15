var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken');
var config = require('./config');

var user = require('./routes/user.js');
var group = require('./routes/group.js');
var access = require('./routes/access.js');

var port = process.env.PORT || config.serverport;

mongoose.connect(config.database, function(err){
  console.log('hello')
  if(err){
    console.log('Error connecting database, please check if MongoDB is running.');
  }else{
    console.log('Connected to database...');
  }
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('body-parser').json({ type : '*/*' }));

// use morgan to log requests to the console
app.use(morgan('dev'));

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// basic routes

app.get('/', function(req, res) {
  res.send('API is running at http://localhost:' + port + '/api');
});

app.post('/register', user.signup);

// express router
var apiRoutes = express.Router();

app.use('/api', apiRoutes);

apiRoutes.post('/login', user.login);

apiRoutes.post('/authorization', user.authorization);

apiRoutes.use(user.authenticate); // route middleware to authenticate and check token

// authenticated routes
apiRoutes.get('/', function(req, res) {
  res.status(201).json({ message: 'Welcome to the authenticated routes!' });
});

apiRoutes.get('/user/:id', user.getuserDetails); // API returns user details

apiRoutes.get('/user', user.getusersDetails); // API returns users details

apiRoutes.delete('/user/:id', user.deluserDetails); // API delete user details

apiRoutes.put('/user/:id', user.updateUser); // API updates user details

apiRoutes.put('/password/:id', user.updatePassword);  // API updates user password

apiRoutes.post('/group', group.savegroup); // API adds group of the user

apiRoutes.put('/group/:_id', group.updateGroup); // API  update group of the user

apiRoutes.delete('/group/:_id', group.delgroup); //API removes the group details of given group name

apiRoutes.get('/group/:_id', group.getgroup); // API returns group details of given group name

apiRoutes.get('/group', group.getgroups); // API returns users details

apiRoutes.post('/access', access.saveaccess); // API adds access of the group

apiRoutes.put('/access/:name', access.updateAccess); // API  update access of the group

apiRoutes.delete('/access/:name', access.delaccess); //API removes the access details of given group name

apiRoutes.get('/access/:name', access.getaccess); // API returns access details of given group name



// kick off the server
app.listen(port);
console.log('app is listening at http://localhost:' + port);
