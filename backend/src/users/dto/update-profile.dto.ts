import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;
}
