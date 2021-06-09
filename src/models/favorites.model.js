const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  id_usuario: String,
  bulas_favoritas: [String],
});

const favorites = mongoose.model("favorites", DataSchema);

module.exports = favorites;
