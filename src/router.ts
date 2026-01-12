import { Router } from "express";
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Monitor Curvo de 40 pulgadas
 *         price:
 *           type: number
 *           example: 300
 *         availability:
 *           type: boolean
 *           example: true
 */





/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

router.get('/', getProduct)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Return a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad Request - Invalid ID
 */


router.get('/:id',
    param('id').isInt().withMessage('ID No Valido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *     post:
 *        summary: Create a new product
 *        tags:
 *          - Products
 *        description: Return a new record in the database
 *        requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor de 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *        responses:
 *            201:
 *                description: Succesful response
 *                content:
 *                     application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad Request - invalid input data
 */  

router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom((value) => value > 0).withMessage('El precio del producto no puede ir vacio'),
    handleInputErrors,
    createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product with user input
 *     tags:
 *       - Products
 *     description: Return the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Monitor de 49 Pulgadas
 *               price:
 *                 type: number
 *                 example: 399
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid ID
 *       404:
 *         description: Product Not Found
 */


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

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update Product availability
 *          tags:
 *            - Products
 *          description: Return the updated availability
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: The ID of the product to update
 *                schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                           schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
 */

router.patch('/:id',
    param('id').isInt().withMessage('ID No Valido'),
    handleInputErrors,
    updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product by agiven ID
 *          tags:
 *            - Products
 *          description: Return a confirmation message
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: The ID of product to delete
 *                schema:
 *                   type: integer
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto Eliminado'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Produc Not Found
 */


router.delete('/:id',
    param('id').isInt().withMessage('ID No Valido'),
    handleInputErrors,
    deleteProduct)

export default router


