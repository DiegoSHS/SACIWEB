const { ObjectId } = require("mongodb")
const dbo = require("../models/connection");


exports.mostrarFormulario = async(req, res) => {
    try {
        // Renderiza la vista "addSensor"
        res.render("sensors/addSensor");
    } catch (error) {
        console.error(error);
        return res.status(503).json({
            message: `Error al mostrar la página: ${error.message}`
        });
    }
};

exports.agregarNuevoSensor = async(req, res) => {
    // Esta es la definición de la función
    try {
        // Obtiene la conexión a la base de datos.
        const db = dbo.getDb();
        // Obtiene la colección de sensores.
        const sensorCollection = await db.collection("sensors");
        // Obtiene los parámetros enviados desde el cliente.
        const { name, description, max, min, status, module, pin } = req.body;
        // console.log(req.body);
        // Crea el nuevo sensor en la base de datos.
        const sensor = await sensorCollection.insertOne({
            name,
            description,
            max: parseInt(max),
            min: parseInt(min),
            status,
            module,
            pin,
        });
        // Envía una alerta de éxito y redirecciona al formulario
        res.send('<script>alert("El sensor fue creado correctamente"); window.location.href="/agregarsensor";</script>');
    } catch (error) {
        console.error(error);
        // Envía una alerta de error y redirecciona al formulario
        res.send('<script>alert("Error al crear el sensor"); window.location.href="/agregarsensor";</script>');
    }
};

exports.list = async(req, res) => {
    try {
        // Obtiene la conexión a la base de datos.
        const db = dbo.getDb();

        // Obtiene la colección de sensores.
        const sensorCollection = await db.collection("sensors");

        // Obtiene todos los sensores de la base de datos.
        const sensors = await sensorCollection.find({}).toArray();

        // Renderiza la vista "sensors" con los datos obtenidos.
        res.render("sensors/index", { sensors });

    } catch (error) {
        console.error(error);

        return res.status(503)
            .json({
                message: `Error al obtener la lista de sensores: ${error.message}`
            });

    }
}