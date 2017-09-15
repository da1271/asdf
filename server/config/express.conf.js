// config should be imported before importing any other file
const config = require('./server.conf');

//----- Include the required Packages
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const appRoot = require('app-root-path');

//----- Declare Constant
const app = express();

//----- Update settings and permission
//console.log(path.join(appRoot.path, 'dist'));
app.use(express.static(path.join(appRoot.path, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//----- Router Declaration
app.use('/api', require('../routes/index.route'));

app.get('*', (req, res) => {
    res.sendFile(path.join(appRoot.path, '/dist/index.html'));
});

app.listen(config.PORT, function() {
    console.log('Node Server running on localhost:' + config.PORT);
});