import express from "express";
import router from "./router";
import db from "./config/db";


//conectar a db con una funcion async

async function connectDB() {
    try {
        await db.authenticate() //Espera la authentication
        db.sync() //Sincroniza los cambios que se hagan
        console.log("Conexion Exitosa a la Base de datos");
    } catch (error) {
        console.log(error);
        console.log("Hubo un error de conexion a la Base de datos");
    }
}

connectDB()//Ejecutamos la bd

const server = express()

server.use('/api/products', router)

export default server


