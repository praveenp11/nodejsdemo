var mongoose = require('mongoose');
mongoose.Primise = global.Promise;

var db = mongoose.connect('mongodb://localhost:27017/test');

module.exports = db;