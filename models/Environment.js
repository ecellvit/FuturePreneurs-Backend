const mongoose = require('mongoose');
const Zone = require("./ZoneModel");

const EnvironmentModel = mongoose.Schema({
  Zones : []
}, {collection : "Environment Setups"});

const Environment = mongoose.model("Environment", EnvironmentModel);
module.exports = Environment;
