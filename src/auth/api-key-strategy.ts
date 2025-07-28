import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

export class ApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(apiKey: string) {
    const user = await this.authService.validateUserByApiKey(apiKey);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
