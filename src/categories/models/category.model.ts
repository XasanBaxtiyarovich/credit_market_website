import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

import { Product } from "../../products/models/product.model";

interface ICategory {
    category_name: string;
}
@Table({tableName: 'categories'})
export class Category extends Model<Category, ICategory> {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;
    @HasMany(() => Product)
    products: Product[];

    @ApiProperty({ example: 'kategorya nomi', description: 'Kategoriya nomi'})
    @Column ({ type: DataType.STRING })
    category_name: string;
}