const dbo = require("../models/connection");

exports.index = async (req, res) =>{

    const db = dbo.getDb();

    const interfaces = await db.collection("log")
    .find()
    .toArray();

    const sensorT1 = await db.collection("sensors")
    .find({id: "temperatura1"})
    .toArray();
    const temperatura = await db.collection("log")
    .find({id: "temperatura1"})
    .toArray();

    const sensorT2 = await db.collection("sensors")
    .find({id: "temperatura2"})
    .toArray();
    const temperatura2 = await db.collection("log")
    .find({id: "temperatura2"})
    .toArray();

    const sensorH1 = await db.collection("sensors")
    .find({id: "humedad1"})
    .toArray();
    const humedad = await db.collection("log")
    .find({id: "humedad1"})
    .toArray();

    const sensorH2 = await db.collection("sensors")
    .find({id: "humedad2"})
    .toArray();
    const humedad2 = await db.collection("log")
    .find({id: "humedad2"})
    .toArray();

    const sensorr = await db.collection("sensors")
    .find({id: "radiacion"})
    .toArray();
    const radiacion = await db.collection("log")
    .find({id: "radiacion"})
    .toArray();

    const sensorp = await db.collection("sensors")
    .find({id: "ph"})
    .toArray();
    const pH = await db.collection("log")
    .find({id: "ph"})
    .toArray();

    const sensorca = await db.collection("sensors")
    .find({id: "ca"})
    .toArray();
    const ca = await db.collection("log")
    .find({id: "ca"})
    .toArray();

    const sensoril = await db.collection("sensors")
    .find({id: "il"})
    .toArray();
    const il = await db.collection("log")
    .find({id: "il"})
    .toArray();

    const sensorCo2 = await db.collection("sensors")
    .find({id: "Co2"})
    .toArray();
    const Co2 = await db.collection("log")
    .find({id: "Co2"})
    .toArray();

    res.render('main/index',
    {
        data: interfaces,
        values: interfaces.map((item) => item.value),
        times: interfaces.map((item) => item.date),

        datat1: sensorT1,
        valuest: temperatura.map((item) => item.value),
        timest: temperatura.map((item) => item.date),

        datat2: sensorT2,
        valuest2: temperatura2.map((item) => item.value),
        timest2: temperatura2.map((item) => item.date),

        datah1: sensorH1,
        valuesh: humedad.map((item) => item.value),
        timesh: humedad.map((item) => item.date),

        datah2: sensorH2,
        valuesh2: humedad2.map((item) => item.value),
        timesh2: humedad2.map((item) => item.date),

        datar: sensorr,
        valuesr: radiacion.map((item) => item.value),
        timesr: radiacion.map((item) => item.date),

        datap: sensorp,
        valuesp: pH.map((item) => item.value),
        timesp: pH.map((item) => item.date),

        dataca: sensorca,
        valuesca: ca.map((item) => item.value),
        timesca: ca.map((item) => item.date),

        datail: sensoril,
        valuesil: il.map((item) => item.value),
        timesil: il.map((item) => item.date),

        dataCo2: sensorCo2,
        valuesCo2: Co2.map((item) => item.value),
        timesCo2: Co2.map((item) => item.date),
    },
    );
}