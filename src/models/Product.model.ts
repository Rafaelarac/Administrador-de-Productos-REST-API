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
    declare name: string

    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product