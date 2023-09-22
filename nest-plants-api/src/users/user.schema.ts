import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: Types.ObjectId, required: true, auto: true })
  _id: Types.ObjectId;

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
