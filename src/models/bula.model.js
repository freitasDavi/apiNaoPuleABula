const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_bula: String,
    descricao_bula: String,
    preco_bula: Number,
}, {
    timestamps: true
});

const usuarios = mongoose.model('bulas', DataSchema);

module.exports = usuarios;