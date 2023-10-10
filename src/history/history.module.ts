import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { History } from './models/history.model';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';

@Module({
  imports: [SequelizeModule.forFeature([History]), JwtModule.register({}) ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
