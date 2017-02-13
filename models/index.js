var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/antons-personal-api");

var Venture = require('./venture');

module.exports.Venture = require('./venture.js');
