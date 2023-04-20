const { ObjectId } = require("mongodb");
const dbo = require("../models/connection");

exports.index = async (req, res) => {
    try{
        const db = dbo.getDb();
        const interfaces = await db.collection("modules")
        .find()
        .toArray();

        res.json(interfaces);
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
        const interfaces = await db.collection("modules");
       
        const {id, module} = req.body;
        const dato = await interfaces.insertOne({
            id, module
        });

        res.json({
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
    let collection = await db.collection("modules");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
}