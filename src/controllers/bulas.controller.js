const Bulas = require("../models/bula.model");

module.exports = {
  async index(request, response) {
    const bula = await Bulas.find();

    response.json(bula);
  },
  async create(request, response) {
    const {
      nome_bula,
      composicao_bula,
      indicacao_bula,
      mecanismo_bula,
      contraindicacoes_bula,
      cuidados_antes_bula,
      armazenamento_bula,
      como_usar_bula,
      esqueceu_bula,
      efeitos_colaterais_bula,
      superdose_bula,
    } = request.body;

    let data = {};

    let bula = await Bulas.findOne({ nome_bula });
    if (!bula) {
      data = {
        nome_bula,
        composicao_bula,
        indicacao_bula,
        mecanismo_bula,
        contraindicacoes_bula,
        cuidados_antes_bula,
        armazenamento_bula,
        como_usar_bula,
        esqueceu_bula,
        efeitos_colaterais_bula,
        superdose_bula,
      };
      bula = await Bulas.create(data);
      return response.status(200).json(bula);
    } else {
      return response.status(500).json(bula);
    }
  },

  async details(request, response) {
    const { _id } = request.params;
    const bula = await Bulas.findOne({ _id });
    response.json(bula);
  },

  async delete(request, response) {
    const { _id } = request.params;

    const bula = await Bulas.findByIdAndDelete({ _id });

    return response.json(bula);
  },

  async update(request, response) {
    const { _id, nome_bula, descricao_bula, preco_bula } = request.body;

    const data = { nome_bula, descricao_bula, preco_bula };

    const bula = await Bulas.findOneAndUpdate({ _id }, data, { new: true }); // Passando new: true para trazer os dados atualizado

    response.json(bula);
  },

  async partialSearch(request, response) {
    if (request.body.search.length === 0) {
      return;
    }

    let searchQ = request.body.search.toLowerCase();

    const rgx = (pattern) => RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(searchQ);

    if (searchQ.length > 0) {
      var query = Bulas.find({
        nome_bula: { $regex: searchRgx, $options: "i" },
      }).limit(5);

      const promise = await query.exec();
      return response.status(200).json(promise);
    }
  },
};
