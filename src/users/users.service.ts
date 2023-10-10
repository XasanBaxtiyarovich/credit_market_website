import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from './models/user.model';
import { MailService } from '../mail/mail.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private readonly userRepo: typeof User,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
      ){};
    
      async getTokens(user: User) {
        const jwtPayload = { id: user.id, isActive: user.isActive }
      
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(jwtPayload, {
            secret: process.env.ACCESS_TOKEN_KEY_USER || 'MyAccesVery',
            expiresIn: process.env.ACCESS_TOKEN_TIME || '15h'
          }),
          this.jwtService.signAsync(jwtPayload, {
            secret: process.env.REFRESH_TOKEN_KEY_USER || 'MyRefresh',
            expiresIn: process.env.REFRESH_TOKEN_TIME || '15d'
          })
        ]);
        
        return {access_token: accessToken, refresh_token: refreshToken};
      };
    
      async activateUser(link: string) {
        if(!link) throw new BadRequestException('Activate link not found')
    
        const updateUser = await this.userRepo.update({isActive: true}, {where: {activation_link: link, isActive: false}, returning: true})
    
        if(!updateUser[1][0]) throw new BadRequestException('User alerdy activated')
    
        return {message: 'User activated successfully', user: updateUser}
      };
      
      async registerUser(registerUserDto: RegisterUserDto, res: Response) {
        const user = await this.userRepo.findOne({where: { mail: registerUserDto.mail }});
        if (user) throw new BadRequestException('EMAIL ALREADY EXISTS');
    
        if (registerUserDto.password != registerUserDto.confirm_password) throw new BadRequestException('PASSWORDS IS NOT MATCH');
    
        const uniqueKey: string = v4();
        const hashed_password = await bcrypt.hash(registerUserDto.password, 7);
    
        const newUser = await this.userRepo.create({...registerUserDto, hashed_password: hashed_password});
    
        const tokens = await this.getTokens(newUser);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    
        const updateUser = await this.userRepo.update(
          {
            hashed_refresh_token: hashed_refresh_token, 
            activation_link: uniqueKey
          }, 
          {
            where: { id: newUser.id }, returning: true
          }
        );
    
        res.cookie('refresh_token', tokens.refresh_token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});

        try {
            const userUrl = "http://localhost:4000/api/users/activate/";
            await this.mailService.sendUserConfirmation(updateUser[1][0], userUrl);
          } catch (error) {
            console.log(error)
          }
    
        return {message: 'User registered', user: updateUser[1][0], tokens};
      };

      async loginUser(loginUserDto: LoginUserDto, res: Response) {
        const user = await this.userRepo.findOne({where: {mail: loginUserDto.mail }});
        if (!user) throw new UnauthorizedException('USER NOT REGISTRED');

        if (!user.isActive) throw new BadRequestException('USER IS NOT ACTIVE');

        const pass = await bcrypt.compare(loginUserDto.password, user.hashed_password);
        if (!pass) throw new UnauthorizedException('USER NOT REGISTRED');
    
        const tokens = await this.getTokens(user);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    
        const updateUser = await this.userRepo.update({hashed_refresh_token}, {where: {id: user.id}, returning: true});
    
        res.cookie('refresh_token', tokens.refresh_token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});
    
        return {message: 'User logged in', user: updateUser[1][0], tokens};
      };

      async logoutUser(refreshToken: string, res: Response) {
        const user = await this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_TOKEN_KEY_USER });
        if(!user) throw new ForbiddenException('USER NOT FOUND');
    
        const updateUser = await this.userRepo.update({hashed_refresh_token: null}, {where: {id: user.id}, returning: true});
    
        res.clearCookie('refresh_token');
        return { message: 'User logged out successfully', LogOutUser: updateUser[1][0]};
      };

      async refreshToken(user_id: number, refreshToken: string, res: Response) {
        const decodedToken = this.jwtService.decode(refreshToken);
        if(user_id != decodedToken['id']) throw new BadRequestException('USER NOT FOUND');
    
        const user = await this.userRepo.findOne({ where: {id: user_id} });
        if(!user || !user.hashed_refresh_token) throw new BadRequestException('USER NOT FOUND');
    
        const tokenMatch = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
        if(!tokenMatch) throw new ForbiddenException('FORBIDDEN');
    
        const tokens = await this.getTokens(user);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    
        const updateUser = await this.userRepo.update({hashed_refresh_token}, {where: {id: user.id}, returning: true});
    
        res.cookie('refresh_token', tokens.refresh_token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});
        
        return {message: 'User refreshed', user: updateUser[1][0], tokens};
      };

      async findAllUser() {
        const users = await this.userRepo.findAll();

        if (users.length === 0) throw new BadRequestException('USERS NOT FOUND');

        return users;
      };

      async findOneUser(id: number) {
        const user = await this.userRepo.findOne({where: {id}});

        if (!user) throw new BadRequestException('USERS NOT FOUND');

        return user;
      };

      async updateOneUser(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepo.findOne({where: {id}});
        if (!user) throw new BadRequestException('USER NOT FOUND');

        const updateUser = await this.userRepo.update(
          {
            first_name: updateUserDto.first_name,
            last_name: updateUserDto.last_name,
            age: updateUserDto.age
          },
          {
            where: {id}, returning: true
          }
        );

        return updateUser[1][0];
      };

      async updatePassword(id: number, updatePasswordDto: UpdateUserPasswordDto) {
        const user = await this.userRepo.findOne({where: {id}});
        if (!user) throw new BadRequestException('USER NOT FOUND');

        const pass = await bcrypt.compare(updatePasswordDto.password, user.hashed_password);
        if (!pass) throw new UnauthorizedException('USER NOT REGISTRED');

        if (updatePasswordDto.new_password != updatePasswordDto.confirm_new_password) throw new BadRequestException('PASSWORDS IS NOT MATCH');

        const newPass = await bcrypt.hash(updatePasswordDto.new_password, 7);

        const updatePassUser = await this.userRepo.update(
          {
            hashed_password: newPass
          },
          {
            where: { id }, returning: true
          }
        );

        return updatePassUser[1][0];
      };

      async deleteOneUser(id: number) {
        const user = await this.userRepo.findOne({where: {id}});
        if (!user) throw new BadRequestException('USERS NOT FOUND');

        await this.userRepo.destroy({where: {id}});

        return {message: 'Success fully', deleteUser: user};
      };
}
