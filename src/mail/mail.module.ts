import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: process.env.MAILER_HOST,
          secure: false,
          auth: {
            user: process.env.MAILDEV_USER,
            pass: process.env.MAILDEV_PASSWORD,
          },
        },
        defaults: {
          from: `"Credit Market " <smtp.gmail.com>`
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          template: 'confirmation',
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService]
    }),
    
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}