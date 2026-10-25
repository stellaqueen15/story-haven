import { ConflictException, Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfile(userId: number, input: UpdateProfileDto) {
    const email = input.email.trim().toLowerCase();
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser && existingUser.id !== userId) {
      throw new ConflictException('Cette adresse e-mail est déjà utilisée.');
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { name: input.name.trim(), email },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    }).catch(() => { throw new NotFoundException('Compte introuvable.'); });

    return { user, message: 'Profil mis à jour.' };
  }

  async updatePassword(userId: number, input: UpdatePasswordDto) {
    if (input.password !== input.password_confirmation) {
      throw new BadRequestException('Les mots de passe ne correspondent pas.');
    }
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Compte introuvable.');
    if (!(await compare(input.current_password, user.password))) {
      throw new UnauthorizedException('Le mot de passe actuel est incorrect.');
    }
    if (input.current_password === input.password) {
      throw new BadRequestException('Choisissez un mot de passe différent de l’actuel.');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: await hash(input.password, 12) },
    });
    return { message: 'Mot de passe mis à jour.' };
  }
}
