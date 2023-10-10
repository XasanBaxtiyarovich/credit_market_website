import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable } from '@nestjs/common';

import { CreditProduct } from './models/credit_product.model';
import { CreateCreditProductDto } from './dto/create-credit_product.dto';
import { UpdateCreditProductDto } from './dto/update-credit_product.dto';

@Injectable()
export class CreditProductService {
  constructor(@InjectModel(CreditProduct) private readonly creditProductRepo: typeof CreditProduct) {}

  createCreditProduct(createCreditProductDto: CreateCreditProductDto) {
    return this.creditProductRepo.create(createCreditProductDto);
  }

  async findAllCreditProducts() {
    const creditProducts = await this.creditProductRepo.findAll();

    if(creditProducts.length === 0) throw new BadRequestException('CREDIT PRODUCTS INFORMATIONS NOT FOUND');

    return creditProducts;
  }

  async findOneCreditProduct(id: number) {
    const creditProduct = await this.creditProductRepo.findOne({where: {id}})

    if (!creditProduct) throw new BadRequestException('CREDIT PRODUCT INFORMATION NOT FOUND');

    return creditProduct;
  }

  async updateCreditProduct(id: number, updateCreditProductDto: UpdateCreditProductDto) {
    const creditProduct = await this.creditProductRepo.findOne({where: {id}})
    if (!creditProduct) throw new BadRequestException('CREDIT PRODUCT INFORMATION NOT FOUND');

    const updateCreditProduct = await this.creditProductRepo.update(
      {
        productID: updateCreditProductDto.productID,
        creditMonth: updateCreditProductDto.creditMonth,
        startPrice: updateCreditProductDto.startPrice,
        monthPrice: updateCreditProductDto.monthPrice,
        sumPrice: updateCreditProductDto.sumPrice,
      },
      {
        where: {id}, returning: true
      }
    );

    return {message: 'Success fully', UpdateData: updateCreditProduct};
  }

  async removeCreditProduct(id: number) {
    const creditProduct = await this.creditProductRepo.findOne({where: {id}})
    if (!creditProduct) throw new BadRequestException('CREDIT PRODUCT INFORMATION NOT FOUND');

    await this.creditProductRepo.destroy({where: {id}});

    return {deleteCreditProduct: creditProduct};
  }
}
