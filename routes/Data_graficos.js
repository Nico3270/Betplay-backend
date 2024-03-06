const { Router } = require("express");
const { dataGraficosPrueba } = require("../controllers/Data_graficos_prueba");
const router = Router();


router.get("/",[], dataGraficosPrueba )


module.exports = router;

