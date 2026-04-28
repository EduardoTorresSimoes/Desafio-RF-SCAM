const pool = require('../db');

const getAll = () =>
  pool.query(`
    SELECT e.id, e.nome, e.email, e.cargo, d.id AS departamento_id, d.nome AS departamento_nome
    FROM empregado e
    JOIN departamento d ON e.departamento_id = d.id
    ORDER BY e.id
  `);

const getById = (id) =>
  pool.query(
    `SELECT e.id, e.nome, e.email, e.cargo, d.id AS departamento_id, d.nome AS departamento_nome
     FROM empregado e
     JOIN departamento d ON e.departamento_id = d.id
     WHERE e.id = $1`,
    [id]
  );

const create = (nome, email, cargo, departamento_id) =>
  pool.query(
    'INSERT INTO empregado (nome, email, cargo, departamento_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, email, cargo, departamento_id]
  );

const update = (id, nome, email, cargo, departamento_id) =>
  pool.query(
    'UPDATE empregado SET nome = $1, email = $2, cargo = $3, departamento_id = $4 WHERE id = $5 RETURNING *',
    [nome, email, cargo, departamento_id, id]
  );

const remove = (id) => pool.query('DELETE FROM empregado WHERE id = $1', [id]);

module.exports = { getAll, getById, create, update, remove };
