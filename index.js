const express = require('express');
const app = express();


app.use(express.json());

let usuarios = [];

// Ejercicio 1: Creación de un endpoint POST para agregar datos
app.post('/agregar', (req, res) => {
    const { nombre, edad, email } = req.body;

    if (!nombre || !edad || !email) {
        return res.status(400).send('Faltan campos obligatorios: nombre, edad, email.');
    }
    
    const nuevoUsuario = { nombre, edad, email };
    usuarios.push(nuevoUsuario);  // Guardar usuario en la base simulada
    res.status(201).json(nuevoUsuario);
});

// Ejercicio 2: Endpoint GET para sumar dos números desde query parameters
app.get('/sumar', (req, res) => {
    const { num1, num2 } = req.query;

    // Validar que ambos parámetros estén presentes
    if (!num1 || !num2) {
        return res.status(400).send('Debes proporcionar los dos números (num1 y num2).');
    }

    const suma = parseFloat(num1) + parseFloat(num2);
    res.json({ resultado: suma });
});

// Ejercicio 3: Endpoint para filtrar usuarios por carrera
app.get('/usuarios/carrera/:carrera', (req, res) => {
    const { carrera } = req.params;
    res.send(`Estás buscando usuarios de la carrera: ${carrera}`);
});

// Ejercicio 4: Creación de un endpoint para actualizar datos
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, edad, email } = req.body;

    // Simular la búsqueda del usuario por ID
    const usuario = usuarios.find((u, index) => index == id);

    if (!usuario) {
        return res.status(404).send('Usuario no encontrado.');
    }

    // Actualizar los campos si están presentes
    if (nombre) usuario.nombre = nombre;
    if (edad) usuario.edad = edad;
    if (email) usuario.email = email;

    res.json({ mensaje: 'Usuario actualizado con éxito', usuario });
});

// Ejercicio 5: Endpoint para eliminar un usuario por ID
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    // Simular la búsqueda del usuario por ID
    const usuarioIndex = usuarios.findIndex((u, index) => index == id);

    if (usuarioIndex === -1) {
        return res.status(404).send('Usuario no encontrado.');
    }

    // Eliminar usuario del arreglo
    usuarios.splice(usuarioIndex, 1);
    res.json({ mensaje: `Usuario con ID ${id} eliminado con éxito.` });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
