import {Router} from "express";
import {body, param} from "express-validator"
import { createProduct, getProduct, getProductById } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router()

//Metodo get para recuperar todos los datos
router.get('/', getProduct)

//Metodo get para Recupera un dato
router.get('/:id',
    param('id').isInt().withMessage('ID No Valido'),
    handleInputErrors,
    getProductById
)  

//Metodo POST agrega nuevos datos, de la funcion product.ts
router.post('/', 
    
    //Reglas de valigacion
    //notEmpty valida que no este vacio, withMessage envie un msj, run toma el req
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    //Valida el precio, isNumeric, valida que sea numero, seguido del mensaje, luego validamos que no este vacio, seguido del mensaje
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom((value) => value > 0).withMessage('El precio del producto no puede ir vacio'),
        handleInputErrors, //Funcion intermedia que verifica si todo esta bien
    createProduct) 


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