const dbo = require("../models/connection")

exports.index = async (req, res) => {
    try {
        const db = dbo.getDb()
        const collection = await db.collection("logs")
        const aggregations = (id) => {
            return collection.aggregate([
                { $match: { id: id } },
                { $sort: { date: 1, hour: 1 } },
                { $project: { _id: 0 } }
            ]).limit(1).toArray()
        }
        const phsensors = [
            "ph_suelo_s1",
            "ph_suelo_s2",
        ]
        const watersensors = [
            "temperatura_suelo_s1",
            "temperatura_suelo_s2",
            "temperatura_suelo_s3",
        ]
        const humiditysensors = [
            "humedad_suelo_s1",
            "humedad_suelo_s2",
            "humedad_suelo_s3",
        ]
        const phpromises = phsensors.map(aggregations)
        const waterpromises = watersensors.map(aggregations)
        const humiditypromises = humiditysensors.map(aggregations)

        const ph = await Promise.allSettled(phpromises)
        const water = await Promise.allSettled(waterpromises)
        const humidity = await Promise.allSettled(humiditypromises)

        const phvalues = ph.map(({ value }) => value).flat()
        const watervalues = water.map(({ value }) => value).flat()
        const humidityvalues = humidity.map(({ value }) => value).flat()

        const reducer = (acc, val) => acc + Number(val?.value)

        const phavg = phvalues.reduce(reducer,0)
        const wateravg = watervalues.reduce(reducer,0)
        const humidityavg = humidityvalues.reduce(reducer,0)

        const result = {
            phavg,
            wateravg,
            humidityavg
        }
        return res.status(200).json(result)
    } catch (error) {
        console.error(error)
        return res.status(503).json({
            message: `Error al leer la lista de logs: ${error.message}`,
        })
    }
}