const { Router } = require("express");
const { dataGraficosPrueba } = require("../controllers/Data_graficos_prueba");
const router = Router();


router.post("/graficos",[], dataGraficosPrueba )


module.exports = router;

