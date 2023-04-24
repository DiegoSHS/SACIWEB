const path = require('path')
const express = require("express")
const cors = require("cors")
require('dotenv').config()
const router = require('./routes')
const app = express()
app.use(express.json())
const dbo = require('./models/connection')

//Para liberar carpeta, para acceder a sus archivos
app.use('/public', express.static('public'))
app.use(cors({
    origin:"*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials:true
}))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Origin","Origin, X-Requested-with, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods")
})
app.set('view engine','ejs')
app.set('views', path.join(__dirname,'views'))

app.use('/', router());

dbo.connectToServer((error) =>{
    if(error){
        console.error(error)
        process.exit(1)
        return false
    }
    app.listen(process.env.PORT, () => {
        console.log(`${process.env.PORT}`)
    })
})

