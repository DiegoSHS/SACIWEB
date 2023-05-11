const dbo = require("../models/connection")

const formatter = (indate, mode = true) => {
    const begin = {
        "isDate": indate instanceof Date && !isNaN(indate.valueOf()),
        "noNull": indate ? true : false
    }
    const date = begin.isDate && begin.noNull ? indate : new Date(Date.now())
    const padtwo = num => num.toString().padStart(2, '0')
    try {
        if (mode) {
            const fullDate = date.toLocaleDateString()
            const dateReve = fullDate.split('/').reverse()
            const datePadd = dateReve.map(padtwo).join('-')
            const fullTime = date.toTimeString().split(' ')
            return `${datePadd} ${fullTime[0]}`
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
        const db = dbo.getDB()
        const collection = await db.collection("logs")
        const logs = await collection.find({}).toArray()
        const updatedlogs = logs.map(({_id,id,value,date,hour}) => {
            value = Number(value)
            const newDate = new Date(`${date} ${hour}`)
            const newLog = {
                _id,
                id,
                value,
                date: formatter(newDate),
                ...formatter(newDate, false)
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
    }catch (error) {
        console.error(error)
        return res.status(503).json({
            message: `Error al leer la lista de logs: ${error.message}`,
        })
    }
}