import {Router} from "express";
import { createProduct } from "./handlers/product";

const router = Router()

//Metodo get recupera datos
router.get('/', (req, res) => {

    //Aqui va el codigo
    res.json('Desde GET')
}) 

//Metodo POST agrega nuevos datos, de la funcion product.ts
router.post('/', createProduct) 


//Metodo PUT reemplaza datos por otros
router.put('/', (req, res) => {

    //Aqui va el codigo
    res.json('Desde PUT')
}) 

//Metodo PATCH actualiza
router.patch('/', (req, res) => {

    //Aqui va el codigo
    res.json('Desde PATCH')
})

//Metodo delete Elimina datos
router.delete('/', (req, res) => {

    //Aqui va el codigo
    res.json('Desde DELETE')
}) 

export default router