const { ObjectId } = require("mongodb");
const dbo = require("../models/connection");

exports.index = async (req, res) => {
    try {
        const db = dbo.getDb()
        const interfaces = await db.collection("sensors")
            .find()
            .toArray()
        return res.status(200).json(interfaces)
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
        const db = dbo.getDb();
        const interfaces = await db.collection("sensors");

        const {
            body: {
                name, description, interface, area, module, min, max, type_measurement, manipulated, status
            }
        } = req
        const dato = await interfaces.insertOne({
            name, description, interface, area, module, min, max, type_measurement, manipulated, status
        })

        return res.status(201).json({
            message: 'El producto fue creado correctamente.',
            dato
        })


    } catch (error) {
        console.error(error)
        return res.status(503)
            .json({
                message: `Error al leer la lista de interfaces: ${error.message}`,
            });
    }
}

exports.show = async (req, res) => {
    const db = dbo.getDb()
    let collection = await db.collection("sensors")
    let query = { _id: ObjectId(req.params.id) }
    let result = await collection.findOne(query)
    return (result ? res.send(result).status(200) : res.send("Not found").status(404))
}

exports.update = async (req, res) => {
    try {
        const {
            params: { id },
            body: {
                name, description, interface, area, module, min, max, type_measurement, manipulated, status
            }
        } = req
        const db = dbo.getDb()
        const update = {
            $set: {
                name, description, interface, area, module, min, max, type_measurement, manipulated, status
            }
        }
        const modules = await db.collection("sensors")
            .updateOne({
                _id: new ObjectId(id)
            }, update)

        return res.status(200).json({
            mesage: "El modulo fue actualizado",
            modules
        }
        );
    } catch (error) {
        console.error(error)
        return res.status(503)
            .json({
                mesage: `Error al actualizar el modulo ${error.message}`
            })
    }
};