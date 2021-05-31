const Usuario = require("../models/usuarios.model");
const jwt = require("jsonwebtoken");
const secret = "meusegredo";

module.exports = {
  async index(request, response) {
    const user = await Usuario.find();

    response.json(user);
  },
  async create(request, response) {
    const { nome_usuario, email_usuario, tipo_usuario, senha_usuario } =
      request.body;

    let data = {};

    let user = await Usuario.findOne({ email_usuario });
    if (!user) {
      data = {
        nome_usuario,
        email_usuario,
        tipo_usuario,
        senha_usuario,
      };
      user = await Usuario.create(data);
      return response.status(200).json(user);
    } else {
      return response.status(500).json(user);
    }
  },

  async details(request, response) {
    const { _id } = request.params;
    const user = await Usuario.findOne({ _id });
    response.json(user);
  },

  async delete(request, response) {
    const { _id } = request.params;

    const user = await Usuario.findByIdAndDelete({ _id });

    return response.json(user);
  },

  async update(request, response) {
    const { _id, nome_usuario, email_usuario, tipo_usuario, senha_usuario } =
      request.body;

    const data = { nome_usuario, email_usuario, tipo_usuario, senha_usuario };

    const user = await Usuario.findOneAndUpdate({ _id }, data, { new: true }); // Passando new: true para trazer os dados atualizado

    response.json(user);
  },

  async login(request, response) {
    const { email, senha } = request.body;
    Usuario.findOne(
      { email_usuario: email, tipo_usuario: 1 },
      function (err, user) {
        if (err) {
          console.log(err);
          response
            .status(200)
            .json({ erro: "Erro no servidor. Por favor, tente novamente" });
        } else if (!user) {
          response
            .status(200)
            .json({ status: 2, erro: "Usuário não encontrado" });
        } else {
          user.isCorrectPassword(senha, async function (err, same) {
            if (err) {
              return response.status(500).json({
                message: "Erro no servidor. Por favor tente novamente",
              });
            } else if (!same) {
              response.status(404).json({
                message: "Senha incorreta, por favor tente novamente",
              });
            } else {
              const payload = { email };
              const token = jwt.sign(payload, secret, {
                expiresIn: "24h",
              });
              response.cookie("token", token, { httpOnly: true });
              response.status(200).json({
                status: 1,
                auth: true,
                token: token,
                id_client: user._id,
                user_name: user.nome_usuario,
              });
            }
          });
        }
      }
    );
  },
};
