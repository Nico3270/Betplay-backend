const mongoose = require('mongoose');

const partidoSchema = new mongoose.Schema({
  equipo1: String,
  equipo2: String,
  condicion: String,
  marcador: String,
  remates: String,
  remates_arco: String, 
  corners: String,
  faltas: String,
  tarjetas: String
  // Otros campos de estadísticas del partido
});

module.exports = mongoose.model('Partido', partidoSchema);