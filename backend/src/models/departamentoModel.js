const pool = require('../db');

const getAll = () => pool.query('SELECT * FROM departamento ORDER BY id');

const getById = (id) => pool.query('SELECT * FROM departamento WHERE id = $1', [id]);

const create = (nome) =>
  pool.query('INSERT INTO departamento (nome) VALUES ($1) RETURNING *', [nome]);

const update = (id, nome) =>
  pool.query('UPDATE departamento SET nome = $1 WHERE id = $2 RETURNING *', [nome, id]);

const remove = (id) => pool.query('DELETE FROM departamento WHERE id = $1', [id]);

module.exports = { getAll, getById, create, update, remove };
