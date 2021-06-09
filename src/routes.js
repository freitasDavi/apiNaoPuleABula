const express = require("express");
const routes = express.Router();
const Bulas = require("./controllers/bulas.controller");
const Alarmes = require("./controllers/alarm.controller");
const Usuario = require("./controllers/usuarios.controller");
const Favoritos = require("./controllers/favorites.controller");

routes.get("/", (request, response) => {
  return response.json({ message: "API Não pule a bula rodando" });
});

// Rotas de Usuários
routes.post("/api/usuarios", Usuario.create);
routes.post("/api/usuarios/login", Usuario.login);
routes.get("/api/usuarios", Usuario.index);
routes.get("/api/usuarios/details/:_id", Usuario.details);
routes.delete("/api/usuarios/:_id", Usuario.delete);
routes.put("/api/usuarios", Usuario.update);

// Rotas de Bulas
routes.post("/api/bulas", Bulas.create);
routes.get("/api/bulas", Bulas.index);
routes.get("/api/bulas/details/:_id", Bulas.details);
routes.delete("/api/bulas/:_id", Bulas.delete);
routes.put("/api/bulas", Bulas.update);
routes.post("/api/bulas/find", Bulas.partialSearch);
routes.post("/api/bulas/codigoBarras", Bulas.barCodeSearch);

// Rotas dos Favoritos
routes.post("/api/favoritos", Favoritos.create);
routes.post("/api/favoritos/login", Favoritos.login);
routes.post("/api/favoritos/listar", Favoritos.favList);
routes.post("/api/favoritos/add", Favoritos.addFavorite);
routes.post("/api/favoritos/remove", Favoritos.removeFavorite);

// Rotas dos Alarmes
routes.post("/api/alarmes", Alarmes.create);
routes.post("/api/alarmes/login", Alarmes.login);
routes.post("/api/alarmes/listar", Alarmes.alarmLists);
routes.post("/api/alarmes/add", Alarmes.addAlarm);
routes.post("/api/alarmes/remove", Alarmes.removeAlarm);

module.exports = routes;
