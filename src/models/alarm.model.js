const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    id_usuario: mongoose.Types.ObjectId,
    alarmes: [
        {
            nome_medicamento: String,
            dias_tratamento: String,
            intervalor_horas: String,
            horario_inicial: String,
            numero_comprimidos: String,
            id_alarme: String
        }
    ]
});

const alarmes = mongoose.model("alarmes", DataSchema);

module.exports = alarmes;