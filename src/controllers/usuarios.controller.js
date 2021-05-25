const Usuario = require('../models/usuarios.model');

module.exports = {
    async index (request, response) {
        const user = await Usuario.find();

        response.json(user);
    },
    async create (request, response) {
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = request.body;

        let data = {};

        let user = await Usuario.findOne({ email_usuario });
        if(!user) {
            data = {
                nome_usuario, email_usuario, tipo_usuario, senha_usuario
            };
            user = await Usuario.create(data);
            return response.status(200).json(user);
        } else {
            return response.status(500).json(user);
        }
    },

    async details (request, response) {
        const { _id } = request.params;
        const user = await Usuario.findOne({_id});
        response.json(user);
    },

    async delete(request, response) {
        const { _id } = request.params;

        const user = await Usuario.findByIdAndDelete({_id});

        return response.json(user);
    },

    async update(request, response) {
        const { _id, nome_usuario, email_usuario, tipo_usuario, senha_usuario} = request.body;
        
        const data = { nome_usuario, email_usuario, tipo_usuario, senha_usuario };
        
        const user = await Usuario.findOneAndUpdate({_id}, data, { new: true}); // Passando new: true para trazer os dados atualizado

        response.json(user);
    }
}