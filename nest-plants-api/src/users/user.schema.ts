// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  picture_url: string;

  @Prop()
  email: string;

  @Prop()
  password: string;  // Remember to hash the password before saving!

  @Prop({ default: false })
  admin: boolean;

  @Prop([Number])
  plant_id: number[];
}

export const UserSchema = SchemaFactory.createForClass(User);
