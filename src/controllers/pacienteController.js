const moment = require("moment");

const { Paciente } =  require('../models');

const pacientesController = {
  listarPaciente: async (req, res) => {
    try {
      const listaDePaciente = await Paciente.findAll();
      res.status(201).json(listaDePaciente);

      // res.json(listaDePaciente);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Ops, tivemos um erro, tente novamente mais tarde." });
    }
  },

  exibirPaciente: async (req, res) => {
    const { id } = req.params;

    try {
      const paciente = await Paciente.findByPk(id);

      if (paciente) {
        return res.json(paciente);
      }

      res.status(404).json({
        mensagem: "Id não encontrado",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },

  cadastrarPaciente: async (req, res) => {
    const { nome, email, data_nascimento } = req.body;

    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Parâmetros faltando ou incorretos." });
    }
    try {
      const dataformat = moment(data_nascimento,"DD/MM/YYYY").format("YYYY/MM/DD")
      const { id } = await Paciente.create({
        nome,
        email,
        data_nascimento: dataformat,
      });

      const novoPaciente = {
        id,
        nome,
        email,
        data_nascimento,
      };
      return res.status(200).json({ novoPaciente });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro interno, Detalhe: " + error.message });
    }
  },

  deletarPaciente: async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
      return res.status(404).json({
        mensagem: "Id não encontrado",
      });
    }
    await paciente.destroy();
    res.status(204).json({
      mensagem: "Paciente excluido",
    });
  },

  atualizarPaciente: async (req, res) => {
    try { 
      const { id } = req.params;
      const { nome, email, data_nascimento } = req.body;

      const dataformat = moment(data_nascimento,"DD/MM/YYYY").format("YYYY/MM/DD");
      const paciente = await Paciente.findByPk(id);

      if (!paciente) {
        return res.status(404).json({
          mensagem: "Paciente não encontrado",
        });
      }
      await Paciente.update(
        { nome, email, data_nascimento: dataformat },
        { where: { id } }
      );

      const pacienteAtualizado = await Paciente.findByPk(id);
      const result =  {
        nome,
        email,
        data_nascimento
      }

      res.json(result);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
};

module.exports = pacientesController;
