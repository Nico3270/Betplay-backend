const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  partidos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partido',
  }],
});

module.exports = mongoose.model('Equipo', equipoSchema);
