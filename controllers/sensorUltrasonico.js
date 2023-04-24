const { ObjectId } = require("mongodb")
const dbo = require("../models/connection")

exports.show = async (req, res) => {
    try {
        const db = dbo.getDb();

        setInterval(async () => {
            const sensor = await db.collection("logs").findOne(
                { id: "nivel_agua" },
                { sort: { $natural: -1 } }
            );
            console.log(sensor); 
        }, 300000);

      
        const ultimoRegistro = await db.collection("logs").findOne(
            { id: "nivel_agua" },
            { sort: { $natural: -1 } }
        );
        res.json(ultimoRegistro);
    } catch (error) {
        console.error(error);
        return res.status(503).json({
            message: `Error al leer el último registro: ${error.message}`,
        });
    }
}

