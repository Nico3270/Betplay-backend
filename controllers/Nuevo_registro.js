const { response, request } = require("express");

const Equipo = require('../models/Equipo');
const Partido = require('../models/Registro');

// Controlador para manejar la creación de un nuevo partido
const crearPartido = async (req = request, res = response) => {
    const { equipo1, equipo2, condicion, marcador, remates, remates_arco, corners, faltas, tarjetas } = req.body;

    try {
        const partidoExistente = await Partido.findOne({
            equipo1,
            equipo2,
            marcador,
            remates,
            remates_arco,
            corners,
            faltas,
            tarjetas
            // Otros campos únicos para identificar un partido específico
        });

        if (partidoExistente) {
            return res.status(400).json({ mensaje: 'Partido registrado previamente' });
        }

        let equipoLocal = await Equipo.findOne({ nombre: equipo1 });
        let equipoVisitante = await Equipo.findOne({ nombre: equipo2 });



        if (!equipoLocal) {
            equipoLocal = new Equipo({ nombre: equipo1 });
        }

        if (!equipoVisitante) {
            equipoVisitante = new Equipo({ nombre: equipo2 });
        }

        const nuevoPartido = new Partido({
            equipo1,
            equipo2,
            marcador,
            remates,
            remates_arco,
            corners,
            faltas,
            tarjetas
            // Otros campos de estadísticas del partido
        });

        await nuevoPartido.save();

        equipoLocal.partidos.push(nuevoPartido);
        await equipoLocal.save();

        equipoVisitante.partidos.push(nuevoPartido);
        await equipoVisitante.save();

        res.status(201).json({ mensaje: 'Partido creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el partido:', error);
        res.status(500).json({ mensaje: 'Error al crear el partido', error });
    }
};

module.exports = { crearPartido };
