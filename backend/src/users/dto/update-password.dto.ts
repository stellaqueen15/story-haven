import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  current_password: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  password_confirmation: string;
}
