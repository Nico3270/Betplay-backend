const { Router } = require("express");
const { obtenerResumenEquipos } = require("../controllers/Resumen_partidos");
const router = Router();

router.get("/", obtenerResumenEquipos);

module.exports = router;
