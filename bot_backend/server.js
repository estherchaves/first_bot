const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

app.use(cors());
app.use(express.json());

// LISTAR produtos
app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produtos', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// ADICIONAR produto
app.post('/produtos', (req, res) => {
  const { nome, quantidade } = req.body;
  const sql = 'INSERT INTO produtos (nome, quantidade) VALUES (?, ?)';
  db.query(sql, [nome, quantidade], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, nome, quantidade });
  });
});

// VENDER produto
app.put('/produtos/:id/vender', (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE produtos SET quantidade = quantidade - 1 WHERE id = ? AND quantidade > 0';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));