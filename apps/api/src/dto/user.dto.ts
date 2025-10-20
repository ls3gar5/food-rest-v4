import { IsString, IsEmail, IsOptional, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The user\'s full name', example: 'John Doe' })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({ description: 'The user\'s email address', example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The user\'s password' })
  @IsString()
  @Length(8, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character'
  })
  password: string;

  @ApiPropertyOptional({ description: 'The user\'s phone number' })
  @IsOptional()
  @IsString()
  @Matches(/^\+?[\d\s-]+$/, {
    message: 'Phone number must be a valid format'
  })
  phone?: string;
}