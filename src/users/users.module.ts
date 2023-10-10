import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './models/user.model';
import { UsersService } from './users.service';
import { MailModule } from '../mail/mail.module';
import { UsersController } from './users.controller';

@Module({
  imports: [ SequelizeModule.forFeature([User]), JwtModule.register({}), MailModule ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}