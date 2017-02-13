var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/antons-personal-api");

module.exports.Venture = require('./venture.js');
