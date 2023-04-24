const { ObjectId } = require("mongodb")
const dbo = require("../models/connection")

exports.index = async(req, res) => {
    try {
        const db = dbo.getDb();

        const log = await db.collection("logs").find({}).toArray();

        const filtro1 = log.filter(element => element.id === "conductividad_luminosidad").slice(-60);
        const filtro2 = log.filter(element => element.id === "conductividad_co2").slice(-60);
        const filtro3 = log.filter(element => element.id === "conductividad_tds").slice(-60);

        res.render('general/agua', {
            title: "Luminosidad",
            data: filtro1,
            value: filtro1.map(({ value }) => value),
            date: filtro1.map(({ date }) => date),
            hour: filtro1.map(({ hour }) => hour),

            serie: {
                name: "Luminosidad",
                data: filtro1.map(({ value }) => value)
            },

            title1: "CO2",
            data1: filtro2,
            value1: filtro2.map(({ value }) => value),
            date1: filtro2.map(({ date }) => date),
            hour1: filtro2.map(({ hour }) => hour),

            serie1: {
                name: "CO2",
                data: filtro2.map(({ value }) => value)
            },

            title2: "TDS",
            data2: filtro3,
            value2: filtro3.map(({ value }) => value),
            date2: filtro3.map(({ date }) => date),
            hour2: filtro3.map(({ hour }) => hour),

            serie2: {
                name: "TDS",
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