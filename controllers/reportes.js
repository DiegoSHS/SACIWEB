const dbo = require("../models/connection");

exports.index = async (req, res) =>{

    const db = dbo.getDb();
    const interfaces = await db.collection("log")
    .find({id: "t2"})
    .toArray();

    res.render('reportes/index',
    {
        data: interfaces,
        values: interfaces.map((item) => item.value),
        times: interfaces.map((item) => item.date),
    },
    );
}