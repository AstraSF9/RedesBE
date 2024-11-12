// Importa Express
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para leer JSON en las solicitudes
app.use(express.json());

// Ruta POST para recibir datos
app.post('/api/datos', (req, res) => {
    const { nombre, apellido, dni } = req.body;
    
    // Validar datos
    if (!nombre || !apellido || !dni) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    // Procesar los datos (en este ejemplo, los imprimimos en consola)
    console.log(`Nombre: ${nombre}, Apellido: ${apellido}, DNI: ${dni}`);

    // Enviar respuesta
    res.json({ mensaje: "Datos recibidos correctamente" });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
