import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  id: string;

  @Prop()
  description?: string;

  @Prop()
  createdAt?: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);