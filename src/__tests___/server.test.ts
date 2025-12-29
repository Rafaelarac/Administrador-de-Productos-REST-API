import request from "supertest";
import server, {connectDB} from "../server";
import db from "../config/db";


describe('GET /api', () => {
    it('should send back a json esponse', async () => {
        const res = await request(server).get('/api')

        //Lo que debe cumplirce
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')


        //Pruebas de lo que no deberia hacer.
        expect(res.status).not.toBe(404)
        expect(res.header['content-type']).not.toMatch(/html/)
        expect(res.body.msg).not.toBe('DESDE API')
    })
})



jest.mock('../config/db')

describe('connectDB', () => {
    it('Should handle database connection error', async() => {
        jest.spyOn(db,'authenticate')
            .mockRejectedValueOnce(new Error("Hubo un error de conexion a la Base de datos"))
            const consoleSpy = jest.spyOn(console, 'log')

            await connectDB()

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining("Hubo un error de conexion a la Base de datos")
            )
    })
}) 