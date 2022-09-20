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
  path?: string; 

  @Prop()
  signedUrl?: string; 

  @Prop()
  fileType?: string; 

  @Prop()
  extension?: string; 

  @Prop()
  createdAt?: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);