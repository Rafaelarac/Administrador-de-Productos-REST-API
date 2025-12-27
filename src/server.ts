import express from "express";
import router from "./router";
import db from "./config/db";
import  colors  from "colors";


//conectar a db con una funcion async

async function connectDB() {
    try {
        await db.authenticate() //Espera la authentication
        db.sync() //Sincroniza los cambios que se hagan
        //console.log(colors.blue.bold("Conexion Exitosa a la Base de datos"));
    } catch (error) {
        //console.log(error);
        //console.log(colors.red.bold("Hubo un error de conexion a la Base de datos"));
    }
}

connectDB()//Ejecutamos la bd

//Instancia de express
const server = express()


//Leer datos de formularios
server.use(express.json())


server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: "Desde API"});
})


export default server


