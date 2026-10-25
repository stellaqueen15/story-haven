import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export type PublicUser = { id: number; name: string; email: string; createdAt: Date; updatedAt: Date };

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async register(input: RegisterDto) {
    if (input.password !== input.password_confirmation) {
      throw new BadRequestException('Les mots de passe ne correspondent pas.');
    }

    const email = input.email.trim().toLowerCase();
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ConflictException('Cette adresse e-mail est déjà utilisée.');

    const user = await this.prisma.user.create({
      data: { name: input.name.trim(), email, password: await hash(input.password, 12) },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });

    return { user, token: await this.createToken(user.id) };
  }

  async login(input: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: input.email.trim().toLowerCase() } });
    if (!user || !(await compare(input.password, user.password))) {
      throw new UnauthorizedException('Adresse e-mail ou mot de passe incorrect.');
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token: await this.createToken(user.id),
    };
  }

  async getUser(userId: number): Promise<PublicUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
    if (!user) throw new UnauthorizedException('Session expirée. Veuillez vous reconnecter.');
    return user;
  }

  async verifyToken(token: string): Promise<number> {
    try {
      const payload = await this.jwt.verifyAsync<{ sub: number }>(token);
      return payload.sub;
    } catch {
      throw new UnauthorizedException('Veuillez vous connecter pour continuer.');
    }
  }

  private createToken(userId: number) {
    return this.jwt.signAsync({ sub: userId });
  }
}
