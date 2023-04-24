const express = require('express')
const router = express.Router()

const indexController = require('../controllers')
const sensoresConroller = require("../controllers/sensores")
const bitacorasController = require("../controllers/bitacoras")
const graficasController = require("../controllers/general")
const graficasAireController = require("../controllers/generalAire")
const graficasSueloController = require("../controllers/generalSuelo")
const graficasAguaController = require("../controllers/generalAgua")
const nivelAguaController = require("../controllers/sensorUltrasonico")
const nivelAguaControlleActualizar = require("../controllers/actualizarEstdo")

module.exports = () => {
  router.get("/", indexController.index)

  router.get("/api/sensors", sensoresConroller.index)
  router.post("/api/sensors", sensoresConroller.add)
  router.get("/api/sensors/:id", sensoresConroller.show)
  router.put("/api/sensors/:id", sensoresConroller.update)

  router.get("/api/log", bitacorasController.index)
  router.get("/api/logbysensor", bitacorasController.show)
  router.get("/api/log/:id", bitacorasController.showone)
  router.post("/api/log", bitacorasController.add)
  router.post("/api/log/", bitacorasController.addMany)
  //graficas generales
  router.get("/general", graficasController.index)
  router.get("/agua", graficasAguaController.index)
  router.get("/suelo", graficasSueloController.index)
  router.get("/aire", graficasAireController.index)
  //nivel de agua
  router.get('/api/ultimo_dato_sensor', nivelAguaController.show)
  router.put("/api/estado_sensor", nivelAguaControlleActualizar.update)
  router.get('/api/estado_sensor', nivelAguaControlleActualizar.show)

  return router
}

/*
  const areasController = require('../controllers/areas');
  const reportesController = require("../controllers/reportes");
  const interfacesController = require("../controllers/interfaces");
  const modulosController = require("../controllers/modulos");
  const seccionesController = require("../controllers/secciones");

  router.get("/interfaces", interfacesController.index);
  router.post("/interfaces", interfacesController.add);
  router.get("/interfaces/:id", interfacesController.show);

  router.get("/api/modules", modulosController.index);
  router.post("/api/modules", modulosController.add);
  router.get("/api/modules/:id", modulosController.show)

  router.get("/sections", seccionesController.index);
  router.post("/sections", seccionesController.add);
  router.get("/sections/:id", seccionesController.show);
  router.put("/sections/:id", seccionesController.update);
  router.get('/areas', areasController.index);
  router.get("/reportes", reportesController.index);

*/