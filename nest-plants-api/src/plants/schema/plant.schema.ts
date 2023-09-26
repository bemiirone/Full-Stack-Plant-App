import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Plant extends Document {

  @Prop({ required: false, unique: true })
  id: number;
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  family: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  slug: string;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
