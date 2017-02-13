var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VentureSchema = new Schema({
  description: String,
  title: String
});

var Venture = mongoose.model('Venture', VentureSchema);

module.exports = Venture;
