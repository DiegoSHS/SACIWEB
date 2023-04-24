const dbo = require("../models/connection")

exports.index = async (req, res) => {
    try {
        const db = dbo.getDb()
        const collection = await db.collection("logs")
        const aggregations = (id) => {
            return collection.aggregate([
                { $match: { id:id } },
                { $sort: { date: 1, hour: 1 } },
                { $project: {_id:0}}
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
        const phpromises = phsensors.map((s)=>aggregations(s))
        const waterpromises = watersensors.map((s)=>aggregations(s))
        const humiditypromises = humiditysensors.map((s)=>aggregations(s))
        const ph = await Promise.allSettled(phpromises)
        const water = await Promise.allSettled(waterpromises)
        const humidity = await Promise.allSettled(humiditypromises)
        const phvalues = ph.map(({value})=>value)
        const watervalues = water.map(({value})=>value)
        const humidityvalues = humidity.map(({value})=>value)
        const phavg = phvalues.reduce((a,v)=>a+=v)
        const wateravg = watervalues.reduce((a,v)=>a+=v)
        const humidityavg = humidityvalues.reduce((a,v)=>a+=v)
        const result = {
            humidityvalues,
            watervalues,
            phvalues,
        }

        return res.status(200).json(result)
    } catch (error){
        console.error(error)
        return res.status(503).json({
            message: `Error al leer la lista de logs: ${error.message}`,
        })
    }
}