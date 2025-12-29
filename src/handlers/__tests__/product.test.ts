import request from "supertest";
import server from "../../server";



describe('POST /api/products', () => {
    //Lo que deberiamos recibir si enviamos los datos vacios (lo contrario o incorrecto)
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({}) //send vacio para simular que no envia nada

        //Pass
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(4)

        //Fail
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    //Lo que deberiamos recibir si enviamos un valor en el precio como 0
    it('should validate that the price is greather than 0', async () => {
        const response = await request(server).post('/api/products').send({
            "name": "Play Station",
            "price": 0
        })

        //Pass
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)

        //Fail
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    //Lo que deberiamos recibir si el valor de precio es string o mayor a 0
    it('should validate that the price is a number and greather than 0', async () => {
        const response = await request(server).post('/api/products').send({
            "name": "Play Station",
            "price": "hola"
        })

        //Pass
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(2)

        //Fail
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })

    //Lo que deberiamos recibir si enviamos correctamente los datos
    it('shuld create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Tarjeta grafica - TESTING",
            price: 100
        })
        //Pass
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("data")

        //Fail
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("errors")
    })
})

describe('GET /api/products', () => {
    it('Should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404) //Testea que no nos de un 404 en el url
    })
    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200) //Testea que tengamos una respuesta exitosa
        expect(response.headers['content-type']).toMatch(/json/) //Testea que la respuesta sea un json
        expect(response.body).toHaveProperty('data') //Teste que venga la propiedad data
        expect(response.body.data).toHaveLength(1) //Testea que nos devuelva un valor
        expect(response.body).not.toHaveProperty('errors') //Testea que no nos de un errrors
    })
})

describe('GET /api/products/:id', () => {
    //Cuando no existe el id del producto
    it('Should return a 404 response for a non-exist product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBe('Producto no encontrado')
    })
    //Cuando tenemos un url invalido
    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID No Valido')
    })

    //Cuando obtenemos un producto
    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {
    it('Should check a valid ID in the URL', async () => {
        const response = await request(server)
            .put('/api/products/not-valid-url')
            .send({
                name: "Xbox 360 elite",
                availability: true,
                price: 300,
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID No Valido')
    })

    it('Should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})

        //Validaciones cuando se envia vacio
        expect(response.status).toBe(400) //se valida que el error sea 400
        expect(response.body).toHaveProperty('errors') //se valida que haya error
        expect(response.body.errors).toHaveLength(5) //Verifica si el body tiene una extencion de 5 mensajes de error

        expect(response.status).not.toBe(200) //se valida que no sea un 200
        expect(response.body).not.toHaveProperty('data') //Se valida que el error no sea un data
    })


    it('Should validate that the price is greather than 0', async () => {
        const response = await request(server)
            .put('/api/products/1')
            .send(
                {
                    name: "Xbox 360 elite",
                    availability: true,
                    price: 0
                }
            )

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1) //Verifica si el body tiene una extencion de 5 mensajes de error
        expect(response.body.errors[0].msg).toBe('El precio del producto no puede ir vacio') //valida por el mensaje

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('Should return a 404 response for a non-exist product', async () => {
        const productId = 2000
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send(
                {
                    name: "Xbox 360 elite",
                    availability: true,
                    price: 300
                }
            )

        expect(response.status).toBe(404)
        expect(response.body.errors).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })


    it('Should update an existing product with valid data', async () => {

        const response = await request(server)
            .put(`/api/products/1`)
            .send(
                {
                    name: "Xbox 360 elite",
                    availability: true,
                    price: 300
                }
            )

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })
})

describe('PATCH /api/products/:id', () => {
    it('Should return a 404 response for a non-existing product', async () => {
        const productId = 2000;
        const response = await request(server).patch(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body.errors).toBe("Producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('Should update the product availability', async () => {
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('DELETE /api/products/id', () => {
    it('Should check a valid id', async () => {
        const response = await request(server)
            .delete(`/api/products/not-valid`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID No Valido')
    })

    it('Should return 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server)
            .delete(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body.errors).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)

    })

    it('Should delete a product id', async () => {
        const response = await request(server).delete(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Producto Eliminado")
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})

