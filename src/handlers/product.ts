import { Request, Response } from 'express'
import Product from '../models/Product.model';



export const getProduct = async (req: Request, res: Response) => {

    try {
        const products = await Product.findAll({
            order: [
                ['id', 'ASC']
            ],
            attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
        })
        res.json({ data: products })

    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        const product = await Product.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
        })

        if (!product) {
            return res.status(404).json({ errors: "Producto no encontrado" })
        }
        res.json({ data: product })

    } catch (error) {
        console.log(error);
    }
}



//Funcion post que se envia al router
export const createProduct = async (req: Request, res: Response) => {
    //Recupera el body del json que creamos opcion 1
    //const product = new Product(req.body)
    //const saveProduct = await product.save()

    //Lo pasamos por el Try/Catch
    try {
        //opcion2
        const product = await Product.create(req.body)
        res.status(201).json({ data: product })

    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

    if (!product) {
        return res.status(404).json({ errors: "Producto no encontrado" })
    }

    //Actualizar
    await product.update(req.body)
    await product.save() //guarda

    res.json({ data: product })
}

export const updateAvailability = async (req, res) => {
    const { id } = req.params
    const product = await Product.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

    if (!product) {
        return res.status(404).json({ errors: "Producto no encontrado" })
    }

    //Actualizar
    product.availability = !product.dataValues.availability
    await product.save() //guarda

    res.json({ data: product })
}


export const deleteProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({ errors: "Producto no encontrado" })
    }

    await product.destroy()
    res.json({data: 'Producto Eliminado'})

}