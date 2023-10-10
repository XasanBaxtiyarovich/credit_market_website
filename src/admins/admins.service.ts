import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

import { Admin } from './models/admin.model';
import { MailService } from '../mail/mail.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { UpdateAdminPasswordDto } from './dto/update-password.dto';

@Injectable()
export class AdminsService {
    constructor(
        @InjectModel(Admin) private readonly adminRepo: typeof Admin,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ){};

    async getTokens(admin: Admin) {
        const jwtPayload = { id: admin.id, isActive: admin.isActive, isAdmin: admin.isAdmin, isSuperAdmin: admin.isSuperAdmin };
      
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(jwtPayload, {
            secret: process.env.ACCESS_TOKEN_KEY_ADMIN || 'MyAccesVery1',
            expiresIn: process.env.ACCESS_TOKEN_TIME || '15h'
          }),
          this.jwtService.signAsync(jwtPayload, {
            secret: process.env.REFRESH_TOKEN_KEY_ADMIN || 'MyRefresh1',
            expiresIn: process.env.REFRESH_TOKEN_TIME || '15d'
          })
        ]);
        
        return {access_token: accessToken, refresh_token: refreshToken};
    };

    async activateAdmin(link: string) {
        if(!link) throw new BadRequestException('Activate link not found')
    
        const updateAdmin = await this.adminRepo.update({isActive: true}, {where: {activation_link: link, isActive: false}, returning: true})
    
        if(!updateAdmin[1][0]) throw new BadRequestException('Admin alerdy activated')
    
        return {message: 'User activated successfully', admin: updateAdmin}
    };

    async registerAdmin(registerAdminDto: RegisterAdminDto, res: Response) {
        const admin = await this.adminRepo.findOne({where: { mail: registerAdminDto.mail }});
        if (admin) throw new BadRequestException('EMAIL ALREADY EXISTS');
    
        if (registerAdminDto.password != registerAdminDto.confirm_password) throw new BadRequestException('PASSWORDS IS NOT MATCH');
    
        const uniqueKey: string = v4();
        const hashed_password = await bcrypt.hash(registerAdminDto.password, 7);
    
        const newAdmin = await this.adminRepo.create({...registerAdminDto, hashed_password: hashed_password});
    
        const tokens = await this.getTokens(newAdmin);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    
        const updateAdmin = await this.adminRepo.update(
          {
            hashed_refresh_token: hashed_refresh_token, 
            activation_link: uniqueKey
          }, 
          {
            where: { id: newAdmin.id }, returning: true
          }
        );
    
        res.cookie('refresh_token', tokens.refresh_token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});

        try {
            const adminUrl = "http://localhost:4000/api/admins/activate/";
            await this.mailService.sendUserConfirmation(updateAdmin[1][0], adminUrl);
          } catch (error) {
            console.log(error)
          }
    
        return {message: 'User registered', user: updateAdmin[1][0], tokens};
    };

    async loginAdmin(loginAdminDto: LoginAdminDto, res: Response) {
        const admin = await this.adminRepo.findOne({where: {mail: loginAdminDto.mail }});
        if (!admin) throw new UnauthorizedException('ADMIN NOT REGISTRED');

        if (!admin.isActive) throw new BadRequestException('ADMIN IS NOT ACTIVE');

        const pass = await bcrypt.compare(loginAdminDto.password, admin.hashed_password);
        if (!pass) throw new UnauthorizedException('ADMIN NOT REGISTRED');
    
        const tokens = await this.getTokens(admin);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    
        const updateAdmin = await this.adminRepo.update({hashed_refresh_token }, {where: {id: admin.id}, returning: true});
    
        res.cookie('refresh_token', tokens.refresh_token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});
    
        return {message: 'User logged in', user: updateAdmin[1][0], tokens};
    };

    async logoutAdmin(refreshToken: string, res: Response) {
        const admin = await this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_TOKEN_KEY_ADMIN });
        if(!admin) throw new ForbiddenException('ADMIN NOT FOUND');
    
        const updateAdmin = await this.adminRepo.update({hashed_refresh_token: null}, {where: {id: admin.id}, returning: true});
    
        res.clearCookie('refresh_token');
        return { message: 'User logged out successfully', LogOutAdmin: updateAdmin[1][0]};
    };

    async refreshToken(admin_id: number, refreshToken: string, res: Response) {
        const decodedToken = this.jwtService.decode(refreshToken);
        if(admin_id != decodedToken['id']) throw new BadRequestException('ADMIN NOT FOUND');
    
        const admin = await this.adminRepo.findOne({ where: {id: admin_id} });
        if(!admin || !admin.hashed_refresh_token) throw new BadRequestException('ADMIN NOT FOUND');
    
        const tokenMatch = await bcrypt.compare(refreshToken, admin.hashed_refresh_token);
        if(!tokenMatch) throw new ForbiddenException('FORBIDDEN');
    
        const tokens = await this.getTokens(admin);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    
        const updateAdmin = await this.adminRepo.update({hashed_refresh_token}, {where: {id: admin.id}, returning: true});
    
        res.cookie('refresh_token', tokens.refresh_token, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});
        
        return {message: 'User refreshed', admin: updateAdmin[1][0], tokens};
    };

    async findAllAdmin() {
      const admins = await this.adminRepo.findAll();

      if (admins.length === 0) throw new BadRequestException('ADMINS NOT FOUND');

      return admins;
    };

    async findOneAdmin(id: number) {
      const admin = await this.adminRepo.findOne({where: {id}});

      if (!admin) throw new BadRequestException('ADMINS NOT FOUND');

      return admin;
    };

    async updateOneAdmin(id: number, updateAdminDto: UpdateAdminDto) {
      const admin = await this.adminRepo.findOne({where: {id}});
      if (!admin) throw new BadRequestException('ADMIN NOT FOUND');

      const updateAdmin = await this.adminRepo.update(
        {
          first_name: updateAdminDto.first_name,
          last_name: updateAdminDto.last_name,
          phone_number: updateAdminDto.phone_number
        },
        {
          where: {id}, returning: true
        }
      );

      return updateAdmin[1][0];
    };

    async updatePassword(id: number, updatePasswordDto: UpdateAdminPasswordDto) {
      const admin = await this.adminRepo.findOne({where: {id}});
      if (!admin) throw new BadRequestException('ADMIN NOT FOUND');

      const pass = await bcrypt.compare(updatePasswordDto.password, admin.hashed_password);
      if (!pass) throw new UnauthorizedException('ADMIN NOT REGISTRED');

      if (updatePasswordDto.new_password != updatePasswordDto.confirm_new_password) throw new BadRequestException('PASSWORDS IS NOT MATCH');

      const newPass = await bcrypt.hash(updatePasswordDto.new_password, 7);

      const updatePassAdmin = await this.adminRepo.update(
        {
          hashed_password: newPass
        },
        {
          where: { id }, returning: true
        }
      );

      return updatePassAdmin[1][0];
    };

    async deleteOneAdmin(id: number) {
      const admin = await this.adminRepo.findOne({where: {id}});
      if (!admin) throw new BadRequestException('USER NOT FOUND');

      await this.adminRepo.destroy({where: {id}});

      return {message: 'Success fully', deleteAdmin: admin};
    };
}