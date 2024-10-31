const { response, request } = require("express");
const Equipo = require('../models/Equipo');
const Partido = require('../models/Registro');
const { reporteEquipo } = require("../helpers/estadisticas");


const obtenerReporteEquipos = async (req = request, res = response) => {

    try {
        // Obtener todos los equipos de la base de datos
        const equipos = await Equipo.find();
        console.log('Equipos encontrados:', equipos);

        // Inicializar objeto para almacenar el resumen de estadísticas
        const resumen = {};

        // Iterar sobre cada equipo y generar el reporte de estadísticas
        for (const equipo of equipos) {
            const partidosEquipo = await Partido.find({ $or: [{ equipo1: equipo.nombre }, { equipo2: equipo.nombre }] });
            console.log('Partidos del equipo', equipo.nombre, ':', partidosEquipo);
            const reporte = reporteEquipo(partidosEquipo, equipo.nombre);
            console.log('Reporte del equipo', equipo.nombre, ':', reporte);


            // Agregar las estadísticas al resumen
            for (const metrica in reporte) {
                if (!resumen[metrica]) {
                    resumen[metrica] = [];
                }
                resumen[metrica].push({
                    equipo: equipo.nombre,
                    promedioOpcionEquipo: reporte[metrica].promedioOpcionEquipo,
                    promedioOpcionContrario: reporte[metrica].promedioOpcionContrario
                });
            }
        }

        // Ordenar el resumen para cada métrica de mayor a menor
        for (const metrica in resumen) {
            resumen[metrica].sort((a, b) => b.promedioOpcionEquipo - a.promedioOpcionEquipo);
        }

        return resumen;
    } catch (error) {
        console.error('Error al obtener el reporte de equipos:', error);
        throw new Error(`Error al obtener el reporte de equipos ${error}`);
    }
};

module.exports = { obtenerReporteEquipos };
