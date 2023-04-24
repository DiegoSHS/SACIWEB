const { ObjectId } = require("mongodb")
const dbo = require("../models/connection")
const padtwo = require("../utils/index.js")
exports.index = async (req, res) => {
    try {
        const db = dbo.getDb()
        const interfaces = await db.collection("logs").find({}).toArray()
        return res.status(200).json(interfaces)
    } catch (error) {
        console.error(error)
        return res.status(503)
            .json({
                message: `Error al leer la lista de interfacez: ${error.message}`
            })
    }
}
exports.showavg = async (req, res) => {
    
}
exports.add = async (req, res) => {
    try {
        const db = dbo.getDb()
        const interfaces = await db.collection("logs")
        const { body: { id, value } } = req
        const fecha = new Date(Date.now())
        const hour = fecha.toTimeString().split(' ')
        const dates = [
            fecha.getFullYear(),
            fecha.getMonth(),
            fecha.getDate(),
        ]
        const date = dates.map(padtwo).join('-')
        const dato = await interfaces.insertOne({
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

exports.addMany = async (req, res) => {
    try {
        const db = dbo.getDb()
        const interfaces = await db.collection("logs")
        const { body: { values } } = req
        const result = await interfaces.insertMany(values)
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

exports.show = async (req, res) => {
    try {
        const db = dbo.getDb()
        const interfaces = await db.collection("logs")
        const sensors = await db.collection("sensors").find({}).toArray()
        const ids = sensors.map(({name}) => name)
        const aggregations = (id) => {
            return interfaces.aggregate([
                { $match: { id:id } },
                { $sort: { date: 1, hour: 1 } },
                { $project: {_id:0}}
            ]).toArray()
        }
        const logs = ids.map((n) => aggregations(n))
        const promises = await Promise.allSettled(logs)
        const sensorLogs = promises.map(({value}) => value)
        return res.status(200).json(sensorLogs)
    } catch (error) {
        console.error(error)
        return res.status(503)
            .json({
                message: `Error al leer la lista de interfacez: ${error.message}`
            })
    }
}
