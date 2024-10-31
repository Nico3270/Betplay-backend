const { obtenerReporteEquipos } = require("../helpers/reporteEquipos");

const obtenerResumenEquipos = async (req, res, next) => {
    try {
        const resumen = await obtenerReporteEquipos();
        res.status(200).json({ resumen });
    } catch (error) {
        console.error('Error al obtener el resumen de equipos:', error);
        res.status(500).json({ message: 'Error al obtener el resumen de equipos' });
    }
};

module.exports = { obtenerResumenEquipos };
