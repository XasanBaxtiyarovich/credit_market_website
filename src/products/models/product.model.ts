import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

import { Category } from "../../categories/models/category.model";
import { CreditProduct } from "../../credit_product/models/credit_product.model";

interface IProduct{
    categoryID: number;
    vendor: string;
    name: string;
    title: string;
    description: string;
    price: number;
    count: number;
}
@Table({tableName: 'products'})
export class Product extends Model<Product, IProduct>{
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 1, description: 'Unique Primary Key ID'})
    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    categoryID: number;
    @BelongsTo(() => Category)
    categories: Category;

    @ApiProperty({ example: 'product sotuvchi', description: 'Product Sotuvchi companiya nomi'})
    @Column ({ type: DataType.STRING })
    vendor: string;

    @ApiProperty({ example: 'product nomi', description: 'Product nomi'})
    @Column ({ type: DataType.STRING })
    name: string;

    @ApiProperty({ example: 'product title', description: 'Product title'})
    @Column ({ type: DataType.STRING })
    title: string;

    @ApiProperty({ example: 'product description', description: 'Product description'})
    @Column ({ type: DataType.STRING })
    description: string;

    @ApiProperty({example: 120000, description: 'Product narxi'})
    @Column({ type: DataType.INTEGER })
    price: number;    

    @ApiProperty({example: 100, description: 'Product sonni'})
    @Column({ type: DataType.INTEGER })
    count: number; 
    
    @HasMany(() => CreditProduct)
    creditProducts: CreditProduct[];
};