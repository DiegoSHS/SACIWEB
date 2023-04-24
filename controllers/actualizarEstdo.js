const { ObjectId } = require("mongodb")
const dbo = require("../models/connection")


exports.update = async (req, res) => {
    try {
        const { params:{id},body:{state} } = req
        if (!id || id.length !== 24) {
            return res.status(400).json({
                message: 'ID inválido',
            });
        }
        const db = dbo.getDb();
        const sensors = await db.collection("sensors");

        const query = { _id: new ObjectId(id) };
        const updates = {
            $set: { state }
        };
        const result = await sensors.updateOne(query, updates);
        res.json({
            message: 'El estado se actualizó correctamente',
            result,
        });
    } catch (error) {
        console.error(error)
        return res.status(503)
            .json({
                message: `Error al actualizar: ${error.message}`,
            });
    }
};

    exports.show = async (req, res) => {
        try{
            const db = dbo.getDb();
            const sensor = await db.collection("sensors")
            .find({"name":"ultrasonico"})
            .toArray();
    
            res.json(sensor);
        }    catch(error){
            console.error(error);
            return res.status(503)
            .json({
                message: `Error al leer la lista de ultrasonico: ${error.message}`
            })
        }
    }



