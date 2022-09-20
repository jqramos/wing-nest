import { IsOptional } from "class-validator";
import { Schema as MongooseSchema } from 'mongoose';

export class BaseProfileDto {
    @IsOptional()
    title: string;
    @IsOptional()
    id: MongooseSchema.Types.ObjectId;
    @IsOptional()
    description: string; 
    @IsOptional()
    fileType: string;
    @IsOptional()
    extension: string;  
    @IsOptional()
    createdAt: Date;
}