const { ObjectId } = require("mongodb")
const dbo = require("../models/connection")

exports.index = async (req, res) => {
    try {
        const db = dbo.getDb();

        const log = await db.collection("logs").find({}).toArray();

        const filtro1 = log.filter(element => element.id === "temperatura_suelo_s1");
            const filtro2 = log.filter(element => element.id === "humedad_suelo_s1");
            const filtro3 = log.filter(element => element.id === "ph_suelo_s1");
            res.render('general/suelo',
                {
                    
                    title: "Temperatura",
                    data: filtro1,
                    value: filtro1.map(({ value }) => value),
                    date: filtro1.map(({ date }) => date),
                    hour: filtro1.map(({ hour }) => hour),

                    serie: {
                        name: "Temperatura",
                        data: filtro1.map(({ value }) => value)
                    },

                    title1: "Húmedad",
                    data1: filtro2,
                    value1: filtro2.map(({ value }) => value),
                    date1: filtro2.map(({ date }) => date),
                    hour1: filtro2.map(({ hour }) => hour),

                    serie1: {
                        name: "Húmedad",
                        data: filtro2.map(({ value }) => value)
                    },

                    title2: "PH",
                    data2: filtro3,
                    value2: filtro3.map(({ value }) => value),
                    date2: filtro3.map(({ date }) => date),
                    hour2: filtro3.map(({ hour }) => hour),

                    serie2: {
                        name: "PH",
                        data: filtro3.map(({ value }) => value)
                    }
                })
        } catch (error) {
            console.error(error);
            return res.status(503).json({
                message: `Error al leer la bitacora: ${error.message}`,
            });
        }
    }

exports.chartTemperatura = async (req, res) => {
        try {
            const db = dbo.getDb();
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;

            const filtro1 = await db.collection("logs").find({
                id: "temperatura_suelo_s1",
                date: { $gte: startDate, $lte: endDate }
            }).toArray();

            const filtro2 = await db.collection("logs").find({
                id: "temperatura_suelo_s2",
                date: { $gte: startDate, $lte: endDate }
            }).toArray();

            const filtro3 = await db.collection("logs").find({
                id: "temperatura_suelo_s3",
                date: { $gte: startDate, $lte: endDate }
            }).toArray();

            res.render('general/suelos/temperatura', {
                title: "Temperatura - Sensor 1",
                data: filtro1,
                value: filtro1.map(({ value }) => value),
                date: filtro1.map(({ date }) => date),
                hour: filtro1.map(({ hour }) => hour),

                serie1: {
                    name: "Temperatura - Sensor 1",
                    data: filtro1.map(({ value }) => value)
                },

                title: "Temperatura - Sensor 2",
                data: filtro2,
                value: filtro2.map(({ value }) => value),
                date: filtro2.map(({ date }) => date),
                hour: filtro2.map(({ hour }) => hour),

                serie2: {
                    name: "Temperatura - Sensor 2",
                    data: filtro2.map(({ value }) => value)
                },

                title: "Temperatura - Sensor 3",
                data: filtro3,
                value: filtro3.map(({ value }) => value),
                date: filtro3.map(({ date }) => date),
                hour: filtro3.map(({ hour }) => hour),

                serie3: {
                    name: "Temperatura - Sensor 3",
                    data: filtro3.map(({ value }) => value)
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Hubo un error en la consulta de datos");
        }
    };

    exports.chartHumedad = async (req, res) => {
        try {
            const db = dbo.getDb();
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;

            const filtro1 = await db.collection("logs").find({
                id: "humedad_suelo_s1",
                date: { $gte: startDate, $lte: endDate }
            }).toArray();

            const filtro2 = await db.collection("logs").find({
                id: "humedad_suelo_s2",
                date: { $gte: startDate, $lte: endDate }
            }).toArray();

            const filtro3 = await db.collection("logs").find({
                id: "humedad_suelo_s3",
                date: { $gte: startDate, $lte: endDate }
            }).toArray();

            res.render('general/suelos/humedad', {
                title: "Húmedad - Sensor 1",
                data: filtro1,
                value: filtro1.map(({ value }) => value),
                date: filtro1.map(({ date }) => date),
                hour: filtro1.map(({ hour }) => hour),

                serie1: {
                    name: "Húmedad - Sensor 1",
                    data: filtro1.map(({ value }) => value)
                },

                title: "Húmedad - Sensor 2",
                data: filtro2,
                value: filtro2.map(({ value }) => value),
                date: filtro2.map(({ date }) => date),
                hour: filtro2.map(({ hour }) => hour),

                serie2: {
                    name: "Húmedad - Sensor 2",
                    data: filtro2.map(({ value }) => value)
                },

                title: "Húmedad - Sensor 3",
                data: filtro3,
                value: filtro3.map(({ value }) => value),
                date: filtro3.map(({ date }) => date),
                hour: filtro3.map(({ hour }) => hour),

                serie3: {
                    name: "Húmedad - Sensor 3",
                    data: filtro3.map(({ value }) => value)
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Hubo un error en la consulta de datos");
        }
    };

    exports.chartPh = async (req, res) => {
        try {
            const db = dbo.getDb();
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;

            const filtro1 = await db.collection("logs").find({
                id: "ph_suelo_s1",
                date: { $gte: startDate, $lte: endDate }
            }).toArray();

            const filtro2 = await db.collection("logs").find({
                id: "ph_suelo_s2",
                date: { $gte: startDate, $lte: endDate }
            }).toArray();

            res.render('general/suelos/ph', {
                title: "PH - Sensor 1",
                data: filtro1,
                value: filtro1.map(({ value }) => value),
                date: filtro1.map(({ date }) => date),
                hour: filtro1.map(({ hour }) => hour),

                serie1: {
                    name: "PH - Sensor 1",
                    data: filtro1.map(({ value }) => value)
                },

                title: "PH - Sensor 2",
                data: filtro2,
                value: filtro2.map(({ value }) => value),
                date: filtro2.map(({ date }) => date),
                hour: filtro2.map(({ hour }) => hour),

                serie2: {
                    name: "HP - Sensor 2",
                    data: filtro2.map(({ value }) => value)
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Hubo un error en la consulta de datos");
        }
    };
