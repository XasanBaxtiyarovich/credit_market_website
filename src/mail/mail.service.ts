import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor (private mailerService: MailerService) {}
    
    async sendUserConfirmation(user: any, userUrl: any) : Promise<void> {
        const url = `${userUrl}${user.activation_link}`;
        await this.mailerService.sendMail({
            to: user.mail,
            subject: "Welcome to Credit Market App! Confirm your Email",
            template: "./confirmation",
            context: {
                name: user.first_name,
                url
            }
        })
    }
}