const dbo = require("../models/connection")

const formatter = (indate, mode = true) => {
    const begin = {
        "isDate": indate instanceof Date && !isNaN(indate.valueOf()),
        "noNull": indate ? true : false
    }
    const date = begin.isDate && begin.noNull ? indate : new Date(Date.now())
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

    const padtwo = num => num.toString().padStart(2, '0')
    try {
        if (mode) {
            const hour = date.toTimeString().split(' ')[0]
            const dates = [
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
            ]
            const date = dates.map(padtwo).join('-')
            return `${date} ${hour}`
        } else {
            const allDates = [date.getFullYear(), date.getMonth(), date.getDate()]
            const [year, month, day] = allDates.map(d => Number(padtwo(d)))
            return { year, month, day, monthName: months[month] }
        }
    } catch (error) {
        return
    }
}
exports.updatelogs = async (req, res) => {
    try {
        const db = dbo.getDb()
        const collection = await db.collection("logs")
        const logs = await collection.find({}).toArray()
        const updatedlogs = logs.map(({ id, value, day, month }) => {
            value = Number(value)
            const newDate = new Date(Date.now())
            const { year, month, day, monthName } = formatter(newDate, false)
            const newLog = {
                id,
                value,
                date: formatter(newDate),
            }
            return newLog
        })
        const result = await collection.deleteMany({})
        const newResult = await collection.insertMany(updatedlogs)
        return res.status(200).json({
            message: 'Logs actualizados correctamente',
            result,
            newResult
        })
    } catch (error) {
        console.error(error)
        return res.status(503).json({
            message: `Error al leer la lista de logs: ${error.message}`,
        })
    }
}