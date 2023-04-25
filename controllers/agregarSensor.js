const { ObjectId } = require("mongodb")
const dbo = require("../models/connection")


exports.add = async(req, res) => {
    try {
        // Obtiene la conexión a la base de datos.
        const db = dbo.getDb();

        // Obtiene la colección de módulos.
        const sensorCollection = await db.collection("sensors");

        // Obtiene los parámetros enviados desde el cliente.
        const { name, description, max, min, status, module, pin } = req.body;

        // Crea el nuevo módulo en la base de datos.
        const sensor = await sensorCollection.insertOne({
            name,
            description,
            max: parseInt(max),
            min: parseInt(min),
            status,
            module,
            pin
        });

        res.json({
            message: 'El sensor fue creado correctamente',

        });

    } catch (error) {
        console.error(error);

        return res.status(503)
            .json({
                message: `Error al crear el sensor: ${error.message}`
            });

    }
}