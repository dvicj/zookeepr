//11.4.4 - middleware - router is using the module exported from animalRoutes.js
const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');

router.use(animalRoutes);

module.exports = router;