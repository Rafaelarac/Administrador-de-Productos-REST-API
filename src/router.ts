import { Router } from "express";
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router()

router.get('/', getProduct)

router.get('/:id',
    param('id').isInt().withMessage('ID No Valido'),
    handleInputErrors,
    getProductById
)

router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom((value) => value > 0).withMessage('El precio del producto no puede ir vacio'),
    handleInputErrors,
    createProduct)



router.put('/:id',
    param('id').isInt().withMessage('ID No Valido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom((value) => value > 0).withMessage('El precio del producto no puede ir vacio'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)


router.patch('/:id',
    param('id').isInt().withMessage('ID No Valido'),
    handleInputErrors,
    updateAvailability)


router.delete('/:id',
    param('id').isInt().withMessage('ID No Valido'),
    handleInputErrors,
    deleteProduct)

export default router


