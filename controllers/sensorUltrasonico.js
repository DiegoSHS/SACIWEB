const { ObjectId } = require("mongodb")
const dbo = require("../models/connection")

setInterval(async () => {
    try {
        const db = dbo.getDb();

        const filtro = await db.collection("logs").findOne({ id: "nivel_agua" }, { sort: { $natural: -1 } });

        console.log("Valor del filtro: ", filtro);

        res.render('general/aire', {
            title: "Nivel de agua",
            value: filtro.value,
            date: filtro.date,
            hour: filtro.hour,

            serie: {
                name: "Nivel de agua",
                data: filtro.value
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(503).json({
            message: `Error al leer la bitacora: ${error.message}`,
        });
    }
}, 300000);
