const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const { verificarToken } = require('./seguridad/auth');

const app = express();

// Conexión a MongoDB
connectDB();

// Middleware para leer JSON
app.use(express.json());

// IMPORTANTE: Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/camisetas', require('./routes/camisetas'));

// Rutas para servir HTML
app.get('/camiseta', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'camiseta.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/carrusel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'carrusel.html'));
});
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); 
app.get('/resultado', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'resultados.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});