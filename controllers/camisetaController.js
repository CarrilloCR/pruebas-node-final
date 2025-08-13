const Camiseta = require('../models/Camiseta');
const Usuario = require('../models/Usuario'); 

// Devuelve todas las camisetas con los datos del usuario creador (nombre y email)
exports.getCamisetas = async (req, res) => {
  try {
    const camisetas = await Camiseta.find().populate('creador', 'nombre email');
    res.json(camisetas);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.getCamisetaOrderById = async (req, res) => {
  try {
    const camisetas = await Camiseta.find().sort({ _id: -1 }).populate('creador', 'nombre email');
    res.json(camisetas);
  }
  catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};



// Devuelve una camiseta por ID con los datos del usuario creador (nombre y email)
exports.getCamisetaById = async (req, res) => {
  try {
    const camiseta = await Camiseta.findById(req.params.id).populate('creador', 'nombre email');
    if (!camiseta) return res.status(404).json({ error: 'Camiseta no encontrada' });
    res.json(camiseta);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.createCamiseta = async (req, res) => {
  try {
    const nuevaCamiseta = new Camiseta(req.body);
    nuevaCamiseta.creador = req.usuarioId; 
    const CamisetaGuardada = await nuevaCamiseta.save();
    res.status(201).json(CamisetaGuardada);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Error al crear camiseta' });
  }
};

exports.updateCamiseta = async (req, res) => {
  try {
    const camisetaActualizada = await Camiseta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!camisetaActualizada) return res.status(404).json({ error: 'Camiseta no encontrada' });
    res.json(camisetaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error al actualizar camiseta' });
  }
};

exports.deleteCamiseta = async (req, res) => {
  try {
    const camisetaEliminada = await Camiseta.findByIdAndDelete(req.params.id);
    if (!camisetaEliminada) return res.status(404).json({ error: 'Camiseta no encontrada' });
    res.json({ message: 'Camiseta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Ejemplo de implementación en Node/Express (JavaScript del lado servidor)
exports.calificarCamiseta= async (req, res) => {
  const id = req.params.id;
  const { calificacion } = req.body;  // calificacion será 1 o -1 según voto
  try {
    // Buscar la camiseta por ID en la base de datos
    const camiseta = await Camiseta.findById(id);
    if (!camiseta) {
      return res.status(404).json({ error: 'Camiseta no encontrada' });
    }
    // Actualizar solo el campo calificacion sumando el valor recibido
    camiseta.calificacion += calificacion;
    await camiseta.save();  // guardar cambios en la BD
    // Devolver la camiseta actualizada (opcionalmente podría devolver solo status)
    return res.json(camiseta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error de servidor' });
  }
};
