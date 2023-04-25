const { ObjectId } = require("mongodb")
const dbo = require("../models/connection")

exports.index = async (req, res) => {
    try {
        const db = dbo.getDb();

        const log = await db.collection("logs").find({}).toArray();

        const filtro1 = log.filter(element => element.id === "temperatura_suelo");
        const filtro2 = log.filter(element => element.id === "humedad_suelo");
        const filtro3 = log.filter(element => element.id === "ph_suelo");

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
        const { startDate, endDate } = req.query; // Obtener fecha de inicio y fecha de fin de los parámetros de consulta
        const db = dbo.getDb();

        const filtro1 = await db.collection("logs").find({
            id: "temperatura_suelo",
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).toArray();

        res.render('general/suelo/temperatura', {
            title: "Temperatura",
            data: filtro1,
            value: filtro1.map(({ value }) => value),
            date: filtro1.map(({ date }) => date),
            hour: filtro1.map(({ hour }) => hour),

            serie: {
                name: "Temperatura",
                data: filtro1.map(({ value }) => value)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error en la consulta de datos");
    }
};

exports.chartHumedad = async (req, res) => {
    try {
        const { startDate, endDate } = req.query; // Obtener fecha de inicio y fecha de fin de los parámetros de consulta
        const db = dbo.getDb();

        const filtro1 = await db.collection("logs").find({
            id: "humedad_suelo",
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).toArray();

        res.render('general/suelo/humedad', {
            title: "Humedad",
            data: filtro1,
            value: filtro1.map(({ value }) => value),
            date: filtro1.map(({ date }) => date),
            hour: filtro1.map(({ hour }) => hour),

            serie: {
                name: "Humedad",
                data: filtro1.map(({ value }) => value)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error en la consulta de datos");
    }
};
exports.chartPh = async (req, res) => {
    try {
        const { startDate, endDate } = req.query; // Obtener fecha de inicio y fecha de fin de los parámetros de consulta
        const db = dbo.getDb();

        const filtro1 = await db.collection("logs").find({
            id: "ph_suelo",
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).toArray();

        res.render('general/suelo/ph', {
            title: "PH",
            data: filtro1,
            value: filtro1.map(({ value }) => value),
            date: filtro1.map(({ date }) => date),
            hour: filtro1.map(({ hour }) => hour),

            serie: {
                name: "PH",
                data: filtro1.map(({ value }) => value)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error en la consulta de datos");
    }
};
