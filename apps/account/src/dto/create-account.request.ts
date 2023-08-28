import { IsNotEmpty, IsNumber, IsPhoneNumber, IsPositive, IsString } from 'class-validator';
// import { SecurityQuestion } from './security-question.request';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  middleName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  maritalStatus: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contactAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  utilityBill: string;

  @ApiProperty()
  @IsPositive()
  NIN: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  passport: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accountType: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;
  
  @ApiProperty()
  @IsString()
  alertType: string;

  @IsNumber()
  accountNumber: number;

  @IsString()
  customerId: string;

  @ApiProperty()
  @IsString()
  referralCode: string;

  // @ApiProperty()
  // @ValidateNested() // Apply validation rules to the nested object
  // securityQuestion: SecurityQuestion;
}
