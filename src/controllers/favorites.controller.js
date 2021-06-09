const Favorites = require("../models/favorites.model");
const Bulas = require("../models/bula.model");
const { json } = require("express");
const mongoose = require("mongoose");

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

  async login(request, response) {
    const { id_usuario } = request.body;

    let favoritos = await Favorites.findOne({ id_usuario });
    if(!favoritos) {
      response.status(500).json({ message: "Favoritos do usuário não encontrados" });
    } else {
      response.status(200).json(favoritos);
    }
  },

  async favList(request, response) {
    const { _id } = request.body;
    const favoritos = await Favorites.findOne({ _id });

    response.status(200).json(favoritos);
  },

  async removeFavorite(request, response) {
    const { _id, id_favorito } = request.body;
    try {
      await Favorites.updateOne(
        { _id },
        { $pull: { bulas_favoritas: { _id: id_favorito } }}
      );

      let favoritos = await Favorites.findOne({ _id });
      
      response.status(200).json(favoritos);
    } catch (e) {
      response.status(500).json(e);
    }
  },

  async addFavorite(request, response) {
    const { _id, id_favorito, bulas_favoritas } = request.body;

    try {
      const favoritos = await Favorites.updateOne(
        { _id },
        { $push: { bulas_favoritas: bulas_favoritas } }
      );

      response.status(200).json(favoritos);
    } catch (e) {
      response.status(500).json(e);
    }
  },
};
