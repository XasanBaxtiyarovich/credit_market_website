import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UseGuards } from '@nestjs/common';

import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UserGuard } from '../guards/user.guard';
import { AdminGuard } from '../guards/admin.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { CookieGetter } from '../decorators/cookie-geter.decorator';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'activate user' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.usersService.activateUser(link);
  };

  @ApiOperation({ summary: 'register user' })
  @ApiResponse({ status: 201, type: User })
  @Post('signup')
  registration(@Body() registerUserDto: RegisterUserDto, @Res({passthrough: true}) res: Response) {
    return this.usersService.registerUser(registerUserDto, res);
  };

  @ApiOperation({ summary: 'login user' })
  @ApiResponse({ status: 200, type: User })
  @Post('signin')
  login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response){
    return this.usersService.loginUser(loginUserDto, res); 
  };

  @ApiOperation({ summary: 'logout User' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(UserGuard)
  @Post('signout')
  logout(@CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true }) res: Response ) {
    return this.usersService.logoutUser(refreshToken, res);
  };

  @ApiOperation({ summary: 'user refreshed' })
  @ApiResponse({ status: 200, type: User })
  @Post(':id/refresh')
  refresh(@Param('id') id: number, @CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true }) res: Response){
    return this.usersService.refreshToken(id, refreshToken, res);
  };

  @ApiOperation( {summary: 'find all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('findAll')
  findAll() {
    return this.usersService.findAllUser();
  };

  @ApiOperation( {summary: 'find one user' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('findOne/:id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOneUser(id);
  };

  @ApiOperation( {summary: 'update one user' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(UserGuard)
  @Put('update-user/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOneUser(id, updateUserDto);
  };

  @ApiOperation( {summary: 'update password one user' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(UserGuard)
  @Patch('update-password/:id')
  updatePassUser(@Param('id') id: number, @Body() updatePasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(id, updatePasswordDto);
  };  

  @ApiOperation( {summary: 'delete user' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(AdminGuard)
  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteOneUser(id);
  }; 
}