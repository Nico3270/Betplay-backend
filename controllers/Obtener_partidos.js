const { response, request } = require("express");
const Equipo = require('../models/Equipo');
const Partido = require('../models/Registro');

const obtenerPartidosEquipo = async (req = request, res = response) => {
    const { equipo } = req.query;

    console.log('Nombre del equipo:', equipo); // Verifica que el nombre del equipo se esté recibiendo correctamente

    try {
        const equipoEncontrado = await Equipo.findOne({ nombre: equipo }).populate('partidos');

        console.log('Equipo encontrado:', equipoEncontrado); // Verifica el equipo encontrado en la base de datos

        if (!equipoEncontrado || equipoEncontrado.partidos.length === 0) {
            return res.status(404).json({ mensaje: 'Este equipo no está registrado o no tiene partidos' });
        }

        res.status(200).json({ partidos: equipoEncontrado.partidos });
    } catch (error) {
        console.error('Error al buscar los partidos del equipo:', error); // Verifica si hay errores en la consulta a la base de datos
        res.status(500).json({ mensaje: 'Error al buscar los partidos del equipo', error });
    }
};

module.exports = { obtenerPartidosEquipo };
