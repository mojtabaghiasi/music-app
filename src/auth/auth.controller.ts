import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Enable2FAType } from './types/enable-2FA.type';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtPayloadType } from './types/jwt.payload.type';
import { UpdateResult } from 'typeorm';
import { ValidateTokenDto } from './dto/validate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(
    @Body() loginDto: LoginDto,
  ): Promise<
    { accessToken: string } | { validate2FA: string; message: string }
  > {
    return this.authService.login(loginDto);
  }

  @Post('enable2FA')
  @UseGuards(JwtAuthGuard)
  enable2FA(@Request() req: { user: JwtPayloadType }): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.userId);
  }

  @Post('disable@FA')
  @UseGuards(JwtAuthGuard)
  disable2FA(@Request() req: { user: JwtPayloadType }): Promise<UpdateResult> {
    console.log(req.user);
    return this.authService.disable2FA(req.user.userId);
  }

  @Post('validate2FA')
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Request() req: { user: JwtPayloadType },
    @Body() validate2FADto: ValidateTokenDto,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FA(req.user.userId, validate2FADto.token);
  }
}
