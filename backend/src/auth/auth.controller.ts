import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './public.decorator';
import { CurrentUserId } from './current-user.decorator';

const COOKIE_NAME = 'storyhaven_token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService, private readonly config: ConfigService) {}

  @Public()
  @Post('register')
  async register(@Body() input: RegisterDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.auth.register(input);
    this.setAuthCookie(response, result.token);
    return { user: result.user, message: 'Compte créé avec succès.' };
  }

  @Public()
  @Post('login')
  async login(@Body() input: LoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.auth.login(input);
    this.setAuthCookie(response, result.token);
    return { user: result.user, message: 'Connexion réussie.' };
  }

  @Get('user')
  getCurrentUser(@CurrentUserId() userId: number) {
    return this.auth.getUser(userId);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(COOKIE_NAME, this.cookieOptions());
    return { message: 'Déconnexion réussie.' };
  }

  private setAuthCookie(response: Response, token: string) {
    response.cookie(COOKIE_NAME, token, { ...this.cookieOptions(), maxAge: COOKIE_MAX_AGE });
  }

  private cookieOptions() {
    return {
      httpOnly: true,
      secure: this.config.get('COOKIE_SECURE') === 'true',
      sameSite: 'lax' as const,
      path: '/',
    };
  }
}
