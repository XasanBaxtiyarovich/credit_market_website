import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Res, UseGuards } from '@nestjs/common';

import { Admin } from './models/admin.model';
import { AdminsService } from './admins.service';
import { AdminGuard } from '../guards/admin.guard';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { SuperAdminGuard } from '../guards/super-admin.guard';
import { UpdateAdminPasswordDto } from './dto/update-password.dto';
import { CookieGetter } from '../decorators/cookie-geter.decorator';

@ApiTags('ADMINS')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: 'activate admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminsService.activateAdmin(link);
  };

  @ApiOperation({ summary: 'register admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  registration(@Body() registerAdminDto: RegisterAdminDto, @Res({passthrough: true}) res: Response) {
    return this.adminsService.registerAdmin(registerAdminDto, res);
  };

  @ApiOperation({ summary: 'login admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('signin')
  login(@Body() loginAdminDto: LoginAdminDto, @Res({ passthrough: true }) res: Response){
    return this.adminsService.loginAdmin(loginAdminDto, res); 
  };

  @ApiOperation({ summary: 'logout Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AdminGuard)
  @Post('signout')
  logout(@CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true }) res: Response ) {
    return this.adminsService.logoutAdmin(refreshToken, res);
  };

  @ApiOperation({ summary: 'admin refreshed' })
  @ApiResponse({ status: 200, type: Admin })
  @Post(':id/refresh')
  refresh(@Param('id') id: number, @CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true }) res: Response){
    return this.adminsService.refreshToken(id, refreshToken, res);
  };

  @ApiOperation( {summary: 'find all admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('findAll')
  findAll() {
    return this.adminsService.findAllAdmin();
  };

  @ApiOperation( {summary: 'find one admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('findOne/:id')
  findOne(@Param('id') id: number) {
    return this.adminsService.findOneAdmin(id);
  };

  @ApiOperation( {summary: 'update one admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(AdminGuard)
  @Put('update-admin/:id')
  updateAdmin(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.updateOneAdmin(id, updateAdminDto);
  };

  @ApiOperation( {summary: 'update password one admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(AdminGuard)
  @Patch('update-password/:id')
  updatePassAdmin(@Param('id') id: number, @Body() updatePasswordDto: UpdateAdminPasswordDto) {
    return this.adminsService.updatePassword(id, updatePasswordDto);
  };  

  @ApiOperation( {summary: 'delete admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(SuperAdminGuard)
  @Delete('delete-admin/:id')
  deleteUser(@Param('id') id: number) {
    return this.adminsService.deleteOneAdmin(id);
  }; 
}
