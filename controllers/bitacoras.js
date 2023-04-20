const { ObjectId } = require("mongodb");
const dbo = require("../models/connection");

exports.index = async (req, res) => {
    try{
        const db = dbo.getDb();
        const interfaces = await db.collection("log")
        .find()
        .toArray();

        res.status(200).json(interfaces);
    }    catch(error){
        console.error(error);
        return res.status(503)
        .json({
            message: `Error al leer la lista de interfacez: ${error.message}`
        })
    }
}

exports.add = async (req, res) => {
    try{
        const db = dbo.getDb();
        const interfaces = await db.collection("log");
       
        const {id, value} = req.body;
        const fecha = new Date();
        const dato = await interfaces.insertOne({
            id, fecha, value 
        });

        res.status(201).json({
            message: 'El producto fue creado correctamente.',
            dato
        });


    }    catch(error){
        console.error(error);
        return res.status(503)
        .json({
            message: `Error al leer la lista de interfacez: ${error.message}`,
        });
    }
}

exports.show = async (req, res) => {
    const db = dbo.getDb();
    let collection = await db.collection("log");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
}