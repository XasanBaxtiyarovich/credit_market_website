import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from '../users/models/user.model';
import { BuyData } from './models/buy_data.model';
import { CreateBuyDataDto } from './dto/create-buy_data.dto';
import { UpdateBuyDataDto } from './dto/update-buy_data.dto';

@Injectable()
export class BuyDataService {
  constructor(@InjectModel(BuyData) private readonly buyDataRepo: typeof BuyData) {}

  createBuyData(createBuyDataDto: CreateBuyDataDto) {
    return this.buyDataRepo.create(createBuyDataDto);
  };

  async findAllBuyData() {
    const buyData = await this.buyDataRepo.findAll({include: User});
    
    if (buyData.length === 0) throw new BadRequestException('USER BUY DATA NOT FOUND');

    return buyData;
  };

  async findOneBuyData(id: number) {
    const buyData = await this.buyDataRepo.findOne({where: {id}, include: User});
    
    if (!buyData) throw new BadRequestException('USER BUY DATA NOT FOUND');
    
    return buyData;
  };

  async updateBuyData(id: number, updateBuyDataDto: UpdateBuyDataDto) {
    const buyData = await this.buyDataRepo.findOne({where: {id}}); 
    if (!buyData) throw new BadRequestException('USER BUY DATA NOT FOUND');

    const updateBuyData = await this.buyDataRepo.update(
      {
        userID: updateBuyDataDto.userID,
        cartNumber: updateBuyDataDto.cartNumber,
        phoneNumber: updateBuyDataDto.phoneNumber,
        pasportNumber: updateBuyDataDto.pasportNumber
      },
      {
        where: {id}, returning: true
      }
    );

    return updateBuyData[1][0];
  };

  async removeBuyData(id: number) {
    const buyData = await this.buyDataRepo.findOne({where: {id}}); 
    if (!buyData) throw new BadRequestException('USER BUY DATA NOT FOUND');

    await this.buyDataRepo.destroy({where: {id}});

    return {deleteBuyData: buyData};
  };
}
