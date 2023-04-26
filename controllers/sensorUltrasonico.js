const { ObjectId } = require("mongodb")
const dbo = require("../models/connection")

exports.show = async (req, res) => {
    try {
        const db = dbo.getDb()

        setInterval(async () => {
            const sensor = await db.collection("logs").findOne(
                { id: "nivel_agua" },
                { sort: { $natural: -1 } }
            )
            console.log(sensor)
        }, 300000)
        const ultimoRegistro = await db.collection("logs").findOne(
            { id: "nivel_agua" },
            { sort: { $natural: -1 } }
        )
        return res.status(200).json(ultimoRegistro)
    } catch (error) {
        console.error(error);
        return res.status(503).json({
            message: `Error al leer el último registro: ${error.message}`,
        });
    }
}

exports.arduino = async(req, res) => {
    const db = dbo.getDb()
    const collection = await db.collection("sensors")
    const state = await collection.aggregate([
        { $match: { name: "ultrasonico" } },
        { $project: { _id: 0, state: 1 } }
    ]).toArray()
    return res.status(200).json(state[0])
}

