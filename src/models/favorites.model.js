const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  id_usuario: String,
  bulas_favoritas: [
    {
      nome_bula: String,
      generico: String,
      composicao_bula: String,
      url_imagem: String,
    },
  ],
});

const favorites = mongoose.model("favorites", DataSchema);

module.exports = favorites;
