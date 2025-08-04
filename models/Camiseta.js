const { Schema, model, Types } = require('mongoose');

const CamisetaSchema = new Schema({
  creador: { type: Types.ObjectId, ref: 'Usuario' }, // Referencia al modelo Usuario
  torsoColor: String,
  mangaIzqColor: String,
  mangaDerColor: String,
  cuelloDerColor: String,
  cuelloIzqColor: String,
  fechaCreacion: { type: Date, default: Date.now },
  votos: [],
  calificacion: { type: Number, default: 0 }
});
module.exports = model('Camiseta', CamisetaSchema);