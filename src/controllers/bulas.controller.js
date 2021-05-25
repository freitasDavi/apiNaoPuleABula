const Bulas = require('../models/bula.model');

module.exports = {
    async index (request, response) {
        const bula = await Bulas.find();

        response.json(bula);
    },
    async create (request, response) {
        const {nome_bula, descricao_bula, preco_bula} = request.body;

        let data = {};

        let bula = await Bulas.findOne({ descricao_bula });
        if(!bula) {
            data = {
                nome_bula, descricao_bula, preco_bula
            };
            bula = await Bulas.create(data);
            return response.status(200).json(bula);
        } else {
            return response.status(500).json(bula);
        }
    },

    async details (request, response) {
        const { _id } = request.params;
        const bula = await Bulas.findOne({_id});
        response.json(bula);
    },

    async delete(request, response) {
        const { _id } = request.params;

        const bula = await Bulas.findByIdAndDelete({_id});

        return response.json(bula);
    },

    async update(request, response) {
        const { _id, nome_bula, descricao_bula, preco_bula} = request.body;
        
        const data = { nome_bula, descricao_bula, preco_bula};
        
        const bula = await Bulas.findOneAndUpdate({_id}, data, { new: true}); // Passando new: true para trazer os dados atualizado

        response.json(bula);
    }
}