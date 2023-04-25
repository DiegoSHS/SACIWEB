const { ObjectId } = require("mongodb")
const dbo = require("../models/connection")
const padtwo = require("../utils/index.js")

const createDate = () => {
    const fecha = new Date(Date.now())
    const hour = fecha.toTimeString().split(' ')[1]
    const dates = [
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate(),
    ]
    const date = dates.map(padtwo).join('-')
    return { date, hour }
}


exports.index = async (req, res) => {
    try {
        const db = dbo.getDb()
        const result = await db.collection("logs").find({}).toArray()
        return res.status(200).json(result)
    } catch (error) {
        console.error(error)
        return res.status(503)
            .json({
                message: `Error al leer la lista de interfacez: ${error.message}`
            })
    }
}
exports.add = async (req, res) => {
    try {
        const db = dbo.getDb()
        const collection = await db.collection("logs")
        const { body: { id, value } } = req
        const { date, hour } = createDate()
        const dato = await collection.insertOne({
            id, date, hour, value
        })
        return res.status(201).json({
            message: 'Insertado correctamente',
            dato
        })
    } catch (error) {
        console.error(error)
        return res.status(503).json({
            message: `Error al leer la lista de logs: ${error.message}`,
        })
    }
}

exports.autofill = async (req, res) => {
    try {
        const db = dbo.getDb()
        const collection = await db.collection("logs")
        let i = 0;
        while (i < 200) {
            const { date, hour } = createDate()
            const id = "tds_agua"
            const between = (min, max) => Math.floor(Math.random() * (max - min) + min)
            const value = between(300, 500)
            await collection.insertOne({
                id, date, hour, value
            })
            i++;
        }
        return res.status(201).json({
            message: 'Insertado correctamente',
        })
    } catch (error) {
        console.error(error)
        return res.status(503).json({
            message: `Error al leer la lista de logs: ${error.message}`,
        })
    }
}

exports.addMany = async (req, res) => {
    try {
        const db = dbo.getDb()
        const collection = await db.collection("logs")
        const { body: { values } } = req
        const result = await collection.insertMany(values)
        return res.status(201).json({
            message: 'Insertado correctamente',
            result
        })
    } catch (error) {
        console.error(error)
        return res.status(503).json({
            message: `Error al insertar logs: ${error.message}`,
        })
    }
}
exports.showone = async (req, res) => {
    try {
        const db = dbo.getDb()
        const collection = await db.collection("logs")
        const { params: { id } } = req
        const query = { id: id }
        const result = collection.aggregate([
            { $match: query },
            { $sort: { date: 1, hour: 1 } },
            { $project: { _id: 0 } }
        ]).toArray()
        return (result ? res.send(result).status(200) : res.send("Not found").status(404))
    } catch (error) {
        console.error(error)
        return res.status(503).json({
            message: `Error al leer la lista de logs: ${error.message}`,
        })
    }
}
exports.show = async (req, res) => {
    try {
        const db = dbo.getDb()
        const collection = await db.collection("logs")
        const sensors = await db.collection("sensors").find({}).toArray()
        const ids = sensors.map(({ name }) => name)
        const aggregations = (id) => {
            return collection.aggregate([
                { $match: { id: id } },
                { $sort: { date: 1, hour: 1 } },
                { $project: { _id: 0 } }
            ]).toArray()
        }
        const logs = ids.map((n) => aggregations(n))
        const promises = await Promise.allSettled(logs)
        const sensorLogs = promises.map(({ value }) => value)
        return res.status(200).json(sensorLogs)
    } catch (error) {
        console.error(error)
        return res.status(503)
            .json({
                message: `Error al leer la lista de interfacez: ${error.message}`
            })
    }
}
