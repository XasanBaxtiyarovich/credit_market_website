import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable } from '@nestjs/common';

import { History } from './models/history.model';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService {
  constructor(@InjectModel(History) private readonly historyRepo: typeof History) {}

  createHistory(createHistoryDto: CreateHistoryDto) {
    return this.historyRepo.create(createHistoryDto);
  }

  async findAllHistory() {
    const histories =  await this.historyRepo.findAll({include: {all: true}});

    if (histories.length === 0) throw new BadRequestException('HISTORIES NOT FOUND');

    return histories;
  }

  async findOneHistory(id: number) {
    const history = await this.historyRepo.findOne({where: {id}});

    if (!history) throw new BadRequestException('HISTORY NOT FOUND');

    return history;
  }

  async updateHistory(id: number, updateHistoryDto: UpdateHistoryDto) {
    const history = await this.historyRepo.findOne({where: {id}});
    if (!history) throw new BadRequestException('HISTORY NOT FOUND');

    const updateHistory = await this.historyRepo.update(
      {
        userDateID: updateHistoryDto.userDateID,
        orderID: updateHistoryDto.orderID,
        paymentMethod: updateHistoryDto.paymentMethod,
        price: updateHistoryDto.price,
        date: updateHistoryDto.date
      },
      {
        where: {id}, returning: true
      }
    );

    return updateHistory[1][0];
  }

  async removeHistory(id: number) {
    const history = await this.historyRepo.findOne({where: {id}});
    if (!history) throw new BadRequestException('HISTORY NOT FOUND');

    await this.historyRepo.destroy({where: {id}})

    return history;
  }
}