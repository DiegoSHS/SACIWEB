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
        const ph = await Promise.all(phsensors.map((s)=>aggregations(s)))
        const water = await Promise.all(watersensors.map((s)=>aggregations(s)))
        const humidity = await Promise.all(humiditysensors.map((s)=>aggregations(s)))
        const result = {
            ph: ph.value,
            water: water.value,
            humidity: humidity.value
        }
        return res.status(200).json(result)
    } catch (error){
        console.error(error)
        return res.status(503).json({
            message: `Error al leer la lista de logs: ${error.message}`,
        })
    }
}