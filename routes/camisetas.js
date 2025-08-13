const express = require('express');
const router = express.Router();
const camisetaController = require('../controllers/camisetaController');
const { verificarToken } = require('../seguridad/auth');

router.get('/', camisetaController.getCamisetas);
router.get('/ordernadoxcalificacion', camisetaController.getCamisetaOrderById); // Sin autenticación para ver todas
router.get('/:id', verificarToken, camisetaController.getCamisetaById);
router.post('/', verificarToken, camisetaController.createCamiseta);
router.put('/:id', verificarToken, camisetaController.updateCamiseta);
router.delete('/:id', verificarToken, camisetaController.deleteCamiseta);

// CORREGIDO: La ruta para votar debe ser /vota/:id, no /vota/:like
router.put('/vota/:id', verificarToken, camisetaController.calificarCamiseta);

module.exports = router;