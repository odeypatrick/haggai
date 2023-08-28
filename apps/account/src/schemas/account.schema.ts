import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';
// import { SecurityQuestion } from '../dto/security-question.request';

@Schema({ versionKey: false })
export class Account extends AbstractDocument {
  @Prop()
  firstName: string;

  @Prop()
  middleName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  gender: string;

  @Prop()
  maritalStatus: string;

  @Prop()
  contactAddress: string;

  @Prop()
  utilityBill: string;

  @Prop()
  NIN: number;

  @Prop()
  dob: string;

  @Prop()
  passport: string;

  @Prop()
  accountType: string;

  @Prop()
  phoneNumber: string;


  @Prop()
  accountNumber: number;

  @Prop()
  customerId: string;
  // @Prop({ type: SecurityQuestion }) // Decorate with type information
  // securityQuestion: SecurityQuestion;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
