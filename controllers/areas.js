const dbo = require("../models/connection");


exports.index = async (req,res)=>{

    const db = dbo.getDb();  


    const areas = await db.collection("Area")
    .find()
    .toArray();


    res.render('areas/index',
    {
        //Areas: areas.map((item)=>item.value)
        Areas: areas
    },);
}