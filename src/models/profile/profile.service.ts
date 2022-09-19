import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Profile, ProfileDocument } from "src/schemas/profile.schema";
import { CreateProfileDto } from "./dto/createProfile.dto";
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(Profile.name) private readonly model: Model<ProfileDocument>,
      ) {}

    createProfile(createProfileDto: CreateProfileDto, file: Express.Multer.File) {
      const fileBlob = this.convertFileToBase64(file);
      
        return new this.model({
            ...createProfileDto,
            createdAt: new Date(),
            file: fileBlob
          }).save();
    }

    //convert file to base64 multer
    convertFileToBase64(file: Express.Multer.File) {
      const fileBlob = file.buffer.toString('base64');
      return fileBlob;
    }
}
