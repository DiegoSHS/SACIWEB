const { ObjectId } = require("mongodb")
const dbo = require("../models/connection")


exports.update = async (req, res) => {
    try {

        if (!req.params.id || req.params.id.length !== 24) {
            return res.status(400).json({
                message: 'ID inválido',
            });
        }
        const db = dbo.getDb();
        const sensors = await db.collection("sensors");

        const { state } = req.body;

        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: { state }
        };
        const result = await sensors.updateOne(query, updates);
        res.json({
            message: 'El estado se actualizó correctamente'
        });
    } catch (error) {
        console.error(error)
        return res.status(503)
            .json({
                message: `Error al actualizar: ${error.message}`,
            });
    }
};
