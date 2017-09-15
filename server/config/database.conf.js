// config should be imported before importing any other file
const config = require('./server.conf');

//----- Include the required Packages
const mongoose = require('mongoose');

//----- Update permission and settings
mongoose.Promise = global.Promise;

//------ DB connection
mongoose.connect(config.MONGO_HOST, { useMongoClient: true },
    function(err) {
        if (err) {
            console.log("Error on Database connection - " + err);
        }
    });
