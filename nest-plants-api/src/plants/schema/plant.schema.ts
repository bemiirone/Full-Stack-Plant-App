import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Plant extends Document {
  @Prop({ type: Types.ObjectId, required: true, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  id: number;
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  family: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  slug: string;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
