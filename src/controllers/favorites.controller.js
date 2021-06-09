const Favorites = require("../models/favorites.model");

module.exports = {
  async index(request, response) {
    const favoriteList = await Favorites.find();

    response.json(favoriteList);
  },

  async create(request, response) {
    const { id_usuario } = request.body;

    let data = {};

    let favoritos = await Favorites.findOne({ id_usuario });
    if (!favoritos) {
      data = {
        id_usuario,
        bulas_favoritas: [],
      };

      favoritos = await Favorites.create(data);
      return response.status(200).json(favoritos);
    } else {
      return response.status(500).json(favoritos);
    }
  },

  async favList(request, response) {
    const { id_usuario } = request.body;
    const favoritos = await Favorites.findOne({ id_usuario });

    response.status(200).json(favoritos);
  },

  async removeFavorite(request, response) {
    const { id_usuario, id_favorito } = request.body;

    const favoritos = await Favorites.findOne({ id_usuario });

    bulas_favoritas = favoritos.bulas_favoritas;

    novos_favoritos = bulas_favoritas.filter(function (value, index, arr) {
      return value !== id_favorito;
    });

    const data = { id_usuario, novos_favoritos };

    const newFav = await Favorites.findOneAndUpdate(
      { _id: favoritos._id },
      data,
      { new: true }
    );

    response.status(200).json(newFav);
  },

  async addFavorite(request, response) {
    const { id_usuario, id_favorito } = request.body;

    const favoritos = await Favorites.findOne({ id_usuario });

    novos_favoritos = favoritos.bulas_favoritas.push(id_favorito);

    const data = { id_usuario, novos_favoritos };

    const newFav = await Favorites.findOneAndUpdate(
      { _id: favoritos._id },
      data,
      { new: true }
    );

    response.status(200).json(newFav);
  },
};
