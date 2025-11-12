import {Router} from "express"; 

const router = Router()

//Metodo get recupera datos
router.get('/', (req, res) => {

    //Aqui va el codigo
    res.json('Desde GET')
}) 

//Metodo POST agrega nuevos datos
router.post('/', (req, res) => {

    //Aqui va el codigo
    res.json('Desde POST')
}) 
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