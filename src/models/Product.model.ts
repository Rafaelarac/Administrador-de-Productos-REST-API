import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

//Creamos la tabla
@Table({
    tableName: 'products'
})

//Asignamos las entidades de la tabla
class Product extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    name: string

    @Column({
        type: DataType.FLOAT(10, 2)
    })
    price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean
}

export default Product