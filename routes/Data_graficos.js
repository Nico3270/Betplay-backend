const { Router } = require("express");
const { dataGraficos } = require("../controllers/Data_graficos");
const router = Router();


router.post("/graficos",[], dataGraficos )


module.exports = router;

