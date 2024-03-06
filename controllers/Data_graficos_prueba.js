const { response, request } = require("express");
const Equipo = require("../models/Equipo");


const dataGraficosPrueba     = async (req = request, res = response) => {
  const { equipo } = req.query;

  return res.status(404).json({ message: equipo });
}

  

module.exports = {dataGraficosPrueba};