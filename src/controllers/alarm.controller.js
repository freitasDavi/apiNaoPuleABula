const alarmes = require("../models/alarm.model");
const { create } = require("../models/alarm.model");
const Alarms = require("../models/alarm.model");

module.exports = {
    async create(request, response) {
        const { id_usuario } = request.body;

        let data = {};

        let alarmes = await Alarms.findOne({ id_usuario });
        if(!alarmes) {
            data = {
                id_usuario,
                alarmes: []
            }

            alarmes = await Alarms.create(data);
            response.status(200).json(alarmes);
        } else {
            response.status(500).json(alarmes);
        };
    },

    async login(request, response) {
        const { id_usuario } = request.body;

        let alarmes = await Alarms.findOne({ id_usuario });
        if(!alarmes) {
            response.status(500).json({ message: "Alarmes do usuário não encontrados" })
        } else {
            response.status(200).json(alarmes);
        }
    },

    async alarmLists(request, response) {
        const { _id } = request.body;
        const alarmes = await Alarms.findOne({ _id });

        response.status(200).json(alarmes);
    },

    async removeAlarm(request, response) {
        const { _id, id_alarme } = request.body;

        try {
            await Alarms.updateOne(
                { _id },
                { $pull: { alarmes: { id_alarme } } }
            );

            let alarmes = await Alarms.findOne({ _id });
            
            response.status(200).json(alarmes);
        } catch (e) {
            response.status(500).json(e);
        }
    },

    async addAlarm(request, response) {
        const { _id,  alarmes } = request.body;

        try {
            const novosAlarmes = await Alarms.updateOne(
                { _id },
                { $push: { alarmes: alarmes }}
            );

            reponse.status(200).json(novosAlarmes);
        } catch (e) {
            response.status(500).json(e);
        }
    }
}