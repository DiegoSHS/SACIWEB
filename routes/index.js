const express = require('express');
const router = express.Router();

const indexController = require('../controllers');

const interfacesController = require("../controllers/interfaces");
const modulosController = require("../controllers/modulos");
const seccionesController = require("../controllers/secciones");
const sensoresConroller = require("../controllers/sensores");
const bitacorasController = require("../controllers/bitacoras");
const reportesController = require("../controllers/reportes");

//Areas
const areasController = require ('../controllers/areas');

module.exports = () =>{
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
    router.post("/log", bitacorasController.add);
    router.get("/log/:id", bitacorasController.show);

    router.get("/reportes", reportesController.index)

      //mostrarAreas

  router.get('/areas',areasController.index);


    return router;
};