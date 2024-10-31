const { response, request } = require("express");
const Equipo = require("../models/Equipo");

const dataGraficos = async (req = request, res = response) => {
  const { equipo } = req.query;

  try {
    // Encuentra el equipo y sus partidos asociados
    const equipoEncontrado = await Equipo.findOne({ nombre: equipo }).populate(
      "partidos"
    );

    if (!equipoEncontrado) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    // Preparar las estructuras de datos
    let estructuraDatos = {
      equipoCondicionLocal: {
        marcador: { EquipoObjetivo: [], EquipoOponente: [] },
        remates: { EquipoObjetivo: [], EquipoOponente: [] },
        remates_arco: { EquipoObjetivo: [], EquipoOponente: [] },
        corners: { EquipoObjetivo: [], EquipoOponente: [] },
        faltas: { EquipoObjetivo: [], EquipoOponente: [] },
        tarjetas: { EquipoObjetivo: [], EquipoOponente: [] },
      },
      equipoCondicionVisitante: {
        marcador: { EquipoObjetivo: [], EquipoOponente: [] },
        remates: { EquipoObjetivo: [], EquipoOponente: [] },
        remates_arco: { EquipoObjetivo: [], EquipoOponente: [] },
        corners: { EquipoObjetivo: [], EquipoOponente: [] },
        faltas: { EquipoObjetivo: [], EquipoOponente: [] },
        tarjetas: { EquipoObjetivo: [], EquipoOponente: [] },
      },
      Promedio: {
        marcador: { CondicionLocal: [], CondicionVisitante: [] },
        remates: { CondicionLocal: [], CondicionVisitante: [] },
        remates_arco: { CondicionLocal: [], CondicionVisitante: [] },
        corners: { CondicionLocal: [], CondicionVisitante: [] },
        faltas: { CondicionLocal: [], CondicionVisitante: [] },
        tarjetas: { CondicionLocal: [], CondicionVisitante: [] },
      },
    };

    // Procesar cada partido para llenar las estructuras de datos
    equipoEncontrado.partidos.forEach((partido) => {
      const esLocal = partido.equipo1 === equipo;
      const claveCondicion = esLocal
        ? "equipoCondicionLocal"
        : "equipoCondicionVisitante";
      const oponente = esLocal ? partido.equipo2 : partido.equipo1;

      // Añadir estadísticas para el equipo objetivo y su oponente
      [
        "marcador",
        "remates",
        "remates_arco",
        "corners",
        "faltas",
        "tarjetas",
      ].forEach((estadistica) => {
        if (partido[estadistica]) {
          const valor = partido[estadistica].split("-");
          const valorEquipoObjetivo = esLocal ? valor[0] : valor[1];
          const valorOponente = esLocal ? valor[1] : valor[0];

          estructuraDatos[claveCondicion][estadistica].EquipoObjetivo.push(
            valorEquipoObjetivo
          );
          estructuraDatos[claveCondicion][estadistica].EquipoOponente.push(
            valorOponente
          );

          // Acumular para promedios
          estructuraDatos.Promedio[estadistica].CondicionLocal.push(
            esLocal ? valorEquipoObjetivo : 0
          );
          estructuraDatos.Promedio[estadistica].CondicionVisitante.push(
            !esLocal ? valorEquipoObjetivo : 0
          );
        } else {
          console.log(`La estadística ${estadistica} no está definida para este partido`);
        }
      });
    });

    // Calcular promedios
    Object.keys(estructuraDatos.Promedio).forEach((estadistica) => {
      ["CondicionLocal", "CondicionVisitante"].forEach((condicion) => {
        const valores = estructuraDatos.Promedio[estadistica][condicion].filter(
          (v) => v !== 0
        );
        const promedio =
          valores.reduce((acc, cur) => acc + parseInt(cur), 0) / valores.length;
        estructuraDatos.Promedio[estadistica][condicion] =
          valores.length > 0 ? promedio.toFixed(2) : "0";
      });
    });

    // Enviar la estructura de datos como respuesta
    return res.json(estructuraDatos);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error procesando los datos de los gráficos" });
  }
};

module.exports = { dataGraficos };
