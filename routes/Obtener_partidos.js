const { Router } = require("express");
const router = Router();
const { obtenerPartidosEquipo} = require("../controllers/Obtener_partidos");

router.get("/",[], obtenerPartidosEquipo )


module.exports = router;

