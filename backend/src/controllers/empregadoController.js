const model = require('../models/empregadoModel');

const listar = async (req, res) => {
  const { rows } = await model.getAll();
  res.json(rows);
};

const buscar = async (req, res) => {
  const { rows } = await model.getById(req.params.id);
  if (!rows.length) return res.status(404).json({ message: 'Empregado não encontrado' });
  res.json(rows[0]);
};

const criar = async (req, res) => {
  const { nome, email, cargo, departamento_id } = req.body;
  const { rows } = await model.create(nome, email, cargo, departamento_id);
  res.status(201).json(rows[0]);
};

const atualizar = async (req, res) => {
  const { nome, email, cargo, departamento_id } = req.body;
  const { rows } = await model.update(req.params.id, nome, email, cargo, departamento_id);
  if (!rows.length) return res.status(404).json({ message: 'Empregado não encontrado' });
  res.json(rows[0]);
};

const deletar = async (req, res) => {
  await model.remove(req.params.id);
  res.status(204).send();
};

module.exports = { listar, buscar, criar, atualizar, deletar };
