// Importa dependencias
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware para leer JSON en las solicitudes
app.use(express.json());

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Conecta a la base de datos y maneja errores de conexión
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Ruta POST para recibir datos
app.post('/api/datos', (req, res) => {
    const { nombre, apellido, dni } = req.body;
    
    // Validar datos
    if (!nombre || !apellido || !dni) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    // Consulta para insertar datos en la base de datos
    const query = 'INSERT INTO usuarios (nombre, apellido, dni) VALUES (?, ?, ?)';
    db.query(query, [nombre, apellido, dni], (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            return res.status(500).json({ mensaje: 'Error al insertar datos' });
        }
        res.json({ mensaje: "Datos guardados correctamente", id: result.insertId });
    });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
