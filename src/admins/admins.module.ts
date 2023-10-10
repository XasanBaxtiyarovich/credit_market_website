import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { Admin } from './models/admin.model';
import { AdminsService } from './admins.service';
import { MailModule } from '../mail/mail.module';
import { AdminsController } from './admins.controller';

@Module({
  imports: [SequelizeModule.forFeature([Admin]), JwtModule.register({}), MailModule],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}