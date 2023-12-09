let partidosChelsea = [
    {
        "_id": "656fb8af101dac6624cfcea7",
        "equipo1": "Chelsea",
        "equipo2": "Liverpool",
        "marcador": "1-1",
        "remates": "10-13",
        "corners": "4-4",
        "faltas": "5-13",
        "tarjetas": "3-4",
        "__v": 0
    },
    {
        "_id": "656fba64101dac6624cfceec",
        "equipo1": "West Ham",
        "equipo2": "Chelsea",
        "marcador": "3-1",
        "remates": "12-17",
        "corners": "3-9",
        "faltas": "12-9",
        "tarjetas": "6-3",
        "__v": 0
    },
    {
        "_id": "656fbacd101dac6624cfcefa",
        "equipo1": "Chelsea",
        "equipo2": "Luton",
        "marcador": "3-0",
        "remates": "19-11",
        "corners": "6-4",
        "faltas": "15-12",
        "tarjetas": "2-3",
        "__v": 0
    },
    {
        "_id": "656fbf1c101dac6624cfcf63",
        "equipo1": "Chelsea",
        "equipo2": "Nottingham Forest",
        "marcador": "0-1",
        "remates": "21-7",
        "corners": "7-0",
        "faltas": "10-9",
        "tarjetas": "3-4",
        "__v": 0
    },
    {
        "_id": "656fc188101dac6624cfcfc5",
        "equipo1": "Bournemouth",
        "equipo2": "Chelsea",
        "marcador": "0-0",
        "remates": "13-14",
        "corners": "1-7",
        "faltas": "14-20",
        "tarjetas": "1-5",
        "__v": 0
    },
    {
        "_id": "656fc31f101dac6624cfd004",
        "equipo1": "Chelsea",
        "equipo2": "Aston Villa",
        "marcador": "0-1",
        "remates": "10-15",
        "corners": "5-11",
        "faltas": "9-11",
        "tarjetas": "4-3",
        "__v": 0
    },
    {
        "_id": "656fc533101dac6624cfd05f",
        "equipo1": "Fulham",
        "equipo2": "Chelsea",
        "marcador": "0-2",
        "remates": "10-11",
        "corners": "8-1",
        "faltas": "15-12",
        "tarjetas": "1-4",
        "__v": 0
    },
    {
        "_id": "656fc65e101dac6624cfd089",
        "equipo1": "Burnley",
        "equipo2": "Chelsea",
        "marcador": "1-4",
        "remates": "10-9",
        "corners": "7-3",
        "faltas": "11-9",
        "tarjetas": "2-4",
        "__v": 0
    },
    {
        "_id": "656ff473dac5a51da2cbdc4b",
        "equipo1": "Chelsea",
        "equipo2": "Arsenal",
        "marcador": "2-2",
        "remates": "11-13",
        "corners": "2-7",
        "faltas": "7-14",
        "tarjetas": "3-3",
        "__v": 0
    },
    {
        "_id": "656ff564dac5a51da2cbdc6e",
        "equipo1": "Chelsea",
        "equipo2": "Brentford",
        "marcador": "0-2",
        "remates": "17-7",
        "corners": "10-1",
        "faltas": "12-7",
        "tarjetas": "1-3",
        "__v": 0
    },
    {
        "_id": "656ff871dac5a51da2cbdcec",
        "equipo1": "Tottenham",
        "equipo2": "Chelsea",
        "marcador": "1-4",
        "remates": "8-17",
        "corners": "1-6",
        "faltas": "12-21",
        "tarjetas": "7-5",
        "__v": 0
    },
    {
        "_id": "656ffa30dac5a51da2cbdd32",
        "equipo1": "Chelsea",
        "equipo2": "Manchester City",
        "marcador": "4-4",
        "remates": "17-15",
        "corners": "3-3",
        "faltas": "12-15",
        "tarjetas": "5-3",
        "__v": 0
    },
    {
        "_id": "656ffaccdac5a51da2cbdd4e",
        "equipo1": "Newcastle",
        "equipo2": "Chelsea",
        "marcador": "4-1",
        "remates": "14-7",
        "corners": "4-2",
        "faltas": "13-19",
        "tarjetas": "4-8",
        "__v": 0
    },
    {
        "_id": "656ffd4bdac5a51da2cbddb7",
        "equipo1": "Chelsea",
        "equipo2": "Brighton",
        "marcador": "3-2",
        "remates": "8-18",
        "corners": "5-8",
        "faltas": "16-12",
        "tarjetas": "7-5",
        "__v": 0
    }
]

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
    const promedioOpcionEquipo = totalOpcionEquipo / cantidadPartidosEquipo;
    const promedioOpcionContrario = totalOpcionContrario / cantidadPartidosContrario;

    return {
        promedioOpcionEquipo,
        promedioOpcionContrario
    };

};



const reporteEquipo = (Data, equipo) => {
    const partidosLocal = Data.filter(partido => partido.equipo1 === equipo);
    // Filtrar partidos donde "Chelsea" juega como equipo visitante (equipo2)
    const partidosVisitante = Data.filter(partido => partido.equipo2 === equipo);

    const promedioMarcadorLocal = calcularPromedioOpcion(partidosLocal, true, 'marcador', equipo);
    const promedioMarcadorVisitante = calcularPromedioOpcion(partidosVisitante, false, 'marcador', equipo);
    const promedioRematesLocal = calcularPromedioOpcion(partidosLocal, true, 'remates', equipo);
    const promedioRematesVisitante = calcularPromedioOpcion(partidosVisitante, false, 'remates', equipo);
    const promedioFaltasLocal = calcularPromedioOpcion(partidosLocal, true, 'faltas', equipo);
    const promedioFaltasVisitante = calcularPromedioOpcion(partidosVisitante, false, 'faltas', equipo);
    const promedioCornersLocal = calcularPromedioOpcion(partidosLocal, true, 'corners', equipo);
    const promedioCornersVisitante = calcularPromedioOpcion(partidosVisitante, false, 'corners', equipo);
    const promedioTarjetasLocal = calcularPromedioOpcion(partidosLocal, true, 'tarjetas', equipo);
    const promedioTarjetasVisitante = calcularPromedioOpcion(partidosVisitante, false, 'tarjetas', equipo);

    return {
        promedioMarcadorLocal, promedioMarcadorVisitante, promedioRematesLocal, promedioRematesVisitante, promedioFaltasLocal,
        promedioFaltasVisitante, promedioCornersLocal, promedioCornersVisitante, promedioTarjetasLocal, promedioTarjetasVisitante
    }

}

module.exports =  {reporteEquipo}
