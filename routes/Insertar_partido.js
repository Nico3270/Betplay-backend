const { Router } = require("express");
const router = Router();
const { crearPartido } = require("../controllers/Nuevo_registro");

router.post("/",[], crearPartido )


module.exports = router;

