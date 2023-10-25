import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserCreateRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  readonly confirmPassword: string;
}
