require('dotenv').config();
const express = require('express');
const cors = require('cors');

const departamentoRoutes = require('./routes/departamentoRoutes');
const empregadoRoutes = require('./routes/empregadoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/departamentos', departamentoRoutes);
app.use('/empregados', empregadoRoutes);

app.use((err, req, res, next) => {
  if (err.code === '23503') return res.status(400).json({ message: 'Não é possível excluir: existem registros vinculados' });
  if (err.code === '23505') return res.status(400).json({ message: 'Email já cadastrado' });
  res.status(500).json({ message: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
