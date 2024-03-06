const { Router } = require("express");

const { dataGraficos } = require("../controllers/Data_graficos");
const router = Router();


router.get("/",[],dataGraficos)


module.exports = router;

