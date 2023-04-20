const {MongoClient} = require("mongodb")

const createClient = (uri = process.env.ATLAS_URI) => new MongoClient(uri)
const client = createClient('mongodb://127.0.0.1:27017')
let dbConnection;

module.exports = {
    connectToServer: function (callback){
        client.connect()
        .then(() =>{
            console.log("Conexion a MongoDB: OK")
            dbConnection = client.db(process.env.DB_BAME)

            return callback()
        })
        .catch((error) => {
            return callback(error)
        });
    },
    getDb: function(){
        return dbConnection
    },
};