import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Product } from './models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '../categories/models/category.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private readonly productRepo: typeof Product) {}

  createProduct(createProductDto: CreateProductDto) {
    return this.productRepo.create(createProductDto);
  }

  async findAllProducts() {
    const products = await this.productRepo.findAll({include: Category});

    if (products.length === 0) throw new BadRequestException('PRODUCTS NOT FOUND');

    return products;
  }

  async findOneProduct(id: number) {
    const product = await this.productRepo.findOne({where: {id}, include: Category});

    if (!product) throw new BadRequestException('PRODUCT NOT FOUND');

    return product;
  }

  async updateOneProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOne({where: {id}});
    if (!product) throw new BadRequestException('PRODUCT NOT FOUND');

    const updateProduct = await this.productRepo.update(
      {
        categoryID: updateProductDto.categoryID,
        vendor: updateProductDto.vendor,
        name: updateProductDto.name,
        title: updateProductDto.title,
        description: updateProductDto.description,
        price: updateProductDto.price,
        count: updateProductDto.count
      },
      {
        where: {id}, returning: true
      }
    );

    return updateProduct[1][0];
  }

  async removeOneProduct(id: number) {
    const product = await this.productRepo.findOne({where: {id}});
    if (!product) throw new BadRequestException('PRODUCT NOT FOUND');

    await this.productRepo.destroy({where: {id}});

    return {deleteProduct: product};
  }
}
