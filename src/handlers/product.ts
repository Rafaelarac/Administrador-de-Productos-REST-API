import {Request, Response} from 'express'
import {check, validationResult} from 'express-validator'
import Product from '../models/Product.model';

//Funcion post que se envia al router
export const createProduct = async (req : Request, res : Response) => {

    //Validacion
    //notEmpty valida que no este vacio, withMessage envie un msj, run toma el req
    await check('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio')
        .run(req)
    //Valida el precio, isNumeric, valida que sea numero, seguido del mensaje, luego validamos que no este vacio, seguido del mensaje
    await check('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom((value) => value > 0).withMessage('El precio del producto no puede ir vacio')
        .run(req)

    //Recuperar mensajes de error y ver la validacion con validationResult nos da un true
    let errors = validationResult(req)
    //Si hay errores.. o esta vacio entra como true, al estar negado en false, entra en true
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    //Recupera el body del json quec creamos
    const product = new Product(req.body)

    const saveProduct = await product.save()

    res.json({data: saveProduct})
}

