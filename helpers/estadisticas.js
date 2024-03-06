
const calcularPromedioOpcion = (partidos, esEquipoLocal, opcion, equipo) => {
    let totalOpcionEquipo = 0;
    let cantidadPartidosEquipo = 0;

    let totalOpcionContrario = 0;
    let cantidadPartidosContrario = 0;

    partidos.forEach(partido => {
        let opcionEquipo = 0;
        let opcionContrario = 0;

        const opcionDatos = partido[opcion].split('-').map(Number);
        if ((esEquipoLocal && partido.equipo1 === equipo) || (!esEquipoLocal && partido.equipo2 === equipo)) {
            opcionEquipo = opcionDatos[0];
            opcionContrario = opcionDatos[1];
        } else {
            opcionEquipo = opcionDatos[1];
            opcionContrario = opcionDatos[0];
        }

        totalOpcionEquipo += opcionEquipo;
        cantidadPartidosEquipo++;

        totalOpcionContrario += opcionContrario;
        cantidadPartidosContrario++;
    });
    const promedioOpcionEquipo = parseFloat((totalOpcionEquipo / cantidadPartidosEquipo).toFixed(2));
    const promedioOpcionContrario = parseFloat((totalOpcionContrario / cantidadPartidosContrario).toFixed(2));

    return {
        promedioOpcionEquipo,
        promedioOpcionContrario
    };
};


const reporteEquipo = (Data, equipo) => {
    const partidosLocal = Data.filter(partido => partido.equipo1 === equipo);
    // Filtrar partidos donde "Chelsea" juega como equipo visitante (equipo2)
    const partidosVisitante = Data.filter(partido => partido.equipo2 === equipo);

    const MarcadorLocal = calcularPromedioOpcion(partidosLocal, true, 'marcador', equipo);
    const MarcadorVisitante = calcularPromedioOpcion(partidosVisitante, false, 'marcador', equipo);
    const RematesLocal = calcularPromedioOpcion(partidosLocal, true, 'remates', equipo);
    const RematesVisitante = calcularPromedioOpcion(partidosVisitante, false, 'remates', equipo);
    const FaltasLocal = calcularPromedioOpcion(partidosLocal, true, 'faltas', equipo);
    const FaltasVisitante = calcularPromedioOpcion(partidosVisitante, false, 'faltas', equipo);
    const CornersLocal = calcularPromedioOpcion(partidosLocal, true, 'corners', equipo);
    const CornersVisitante = calcularPromedioOpcion(partidosVisitante, false, 'corners', equipo);
    const TarjetasLocal = calcularPromedioOpcion(partidosLocal, true, 'tarjetas', equipo);
    const TarjetasVisitante = calcularPromedioOpcion(partidosVisitante, false, 'tarjetas', equipo);

    return {
        MarcadorLocal, 
        MarcadorVisitante, 
        RematesLocal, 
        RematesVisitante, 
        FaltasLocal,
        FaltasVisitante, 
        CornersLocal, 
        CornersVisitante, 
        TarjetasLocal, 
        TarjetasVisitante
    }

}


module.exports =  {reporteEquipo}
