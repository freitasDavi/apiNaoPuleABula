const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    nome_bula: String, // Rivotril
    composicao_bula: String, // Rivotril Gotas de 2,5 mg
    indicacao_bula: [
      // 111111111
      {
        idade: String, // Adulto
        tratamento: String, // Transtornos de ansiedade
        sintoma: [String],
      },
    ], // Anotação 1
    mecanismo_bula: [String], // Anotação 2 Como funciona 22222
    contraindicacoes_bula: [String], // Anotação 3 Quando não usar
    cuidados_antes_bula: [String], // 4 Antes de tomar Rivotril®
    armazenamento_bula: [String], // 5 armazenamento
    como_usar_bula: [String], // 6666 Como Usar
    esqueceu_bula: [String], // 7777 Esqueceu?
    efeitos_colaterais_bula: [String], // 888888888888888888 Efeitos Colaterais?
    superdose_bula: [String],
  },
  {
    timestamps: true,
  }
);

const usuarios = mongoose.model("bulas", DataSchema);

module.exports = usuarios;
