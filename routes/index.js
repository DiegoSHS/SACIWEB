const express = require('express');
const router = express.Router();

const indexController = require('../controllers');

const interfacesController = require("../controllers/interfaces");
const modulosController = require("../controllers/modulos");
const seccionesController = require("../controllers/secciones");
const sensoresConroller = require("../controllers/sensores");
const bitacorasController = require("../controllers/bitacoras");
const reportesController = require("../controllers/reportes");
const graficasController = require("../controllers/general");
const graficasAireController = require("../controllers/generalAire");
const graficasSueloController = require("../controllers/generalSuelo");
const graficasAguaController = require("../controllers/generalAgua");
const nivelAguaController = require("../controllers/sensorUltrasonico");
const nivelAguaControlleActualizar = require("../controllers/actualizarEstdo");


//Areas
const areasController = require('../controllers/areas');

module.exports = () => {
  router.get("/", indexController.index);

  router.get("/interfaces", interfacesController.index);
  router.post("/interfaces", interfacesController.add);
  router.get("/interfaces/:id", interfacesController.show);

  router.get("/modules", modulosController.index);
  router.post("/modules", modulosController.add);
  router.get("/modules/:id", modulosController.show)

  router.get("/sections", seccionesController.index);
  router.post("/sections", seccionesController.add);
  router.get("/sections/:id", seccionesController.show);
  router.put("/sections/:id", seccionesController.update);

  router.get("/sensors", sensoresConroller.index);
  router.post("/sensors", sensoresConroller.add);
  router.get("/sensors/:id", sensoresConroller.show);
  router.put("/sensors/:id", sensoresConroller.update);

  router.get("/log", bitacorasController.index);
  router.get("/logbysensor", bitacorasController.show);
  router.post("/log", bitacorasController.add);

  router.get("/reportes", reportesController.index);

  //graficas generales
  router.get("/general", graficasController.index);
  router.get("/agua", graficasAguaController.index);
  router.get("/suelo", graficasSueloController.index);
  router.get("/aire", graficasAireController.index);

  //mostrarAreas

  router.get('/areas', areasController.index);

  //nivel de agua
  router.get('/ultimo_dato_sensor',nivelAguaController.show)
  router.put("/estado_sensor",nivelAguaControlleActualizar.update);

  return router;
};