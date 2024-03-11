import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Roles {
  INTERN = 'Intern',
  ENGINEER = 'Engineer',
  ADMIN = 'Admin',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  roles: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);
