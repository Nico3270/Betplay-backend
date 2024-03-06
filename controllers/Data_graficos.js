const { response, request } = require("express");
const Equipo = require("../models/Equipo");
const Partido = require("../models/Registro");
const { reporteEquipo } = require("../helpers/estadisticas");

const dataGraficos = async (req = request, res = response) => {
  const { equipo } = req.query;

    return res.json(equipo);
  
};

module.exports = {dataGraficos}
