const { ObjectId } = require("mongodb");
const dbo = require("../models/connection");

exports.index = async (req, res) => {
    try{
        const db = dbo.getDb();
        const interfaces = await db.collection("sections")
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
        const interfaces = await db.collection("sections");
       
        const {id,sections} = req.body;
        const dato = await interfaces.insertOne({
            id,
            sections
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
    let collection = await db.collection("sections");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
}

exports.update = async (req, res) => {
    try {
        const db = dbo.getDb();
        const update = {$set:{id: req.body.id, sections: req.body.sections}};
        const modules = await db.collection("sections")
        .updateOne({
            _id: new ObjectId(req.params.id)
        },update)

        res.json({
            mesage: "El modulo fue actualizado",
            modules
        }
        );
    } catch(error) {
        console.error(error);
        return res.status(503)
        .json({
            mesage: `Error al actualizar el modulo ${error.message}`
        });
    }
  };