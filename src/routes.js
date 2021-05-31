const express = require('express');
const Usuario = require('./controllers/usuarios.controller');
const Bulas = require('./controllers/bulas.controller');
const routes = express.Router();


routes.get('/', (request, response) => {
    return response.json({ message: "API Não pule a bula rodando"});
});

// Rotas de Usuários
routes.post('/api/usuarios', Usuario.create);
routes.post('/api/usuarios/login', Usuario.login);
routes.get('/api/usuarios', Usuario.index);
routes.get('/api/usuarios/details/:_id', Usuario.details);
routes.delete('/api/usuarios/:_id', Usuario.delete);
routes.put('/api/usuarios', Usuario.update);

// Rotas de Bulas
routes.post('/api/bulas', Bulas.create);
routes.get('/api/bulas', Bulas.index);
routes.get('/api/bulas/details/:_id', Bulas.details);
routes.delete('/api/bulas/:_id', Bulas.delete);
routes.put('/api/bulas', Bulas.update);
routes.post('/api/bulas/find', Bulas.partialSearch);

module.exports = routes;