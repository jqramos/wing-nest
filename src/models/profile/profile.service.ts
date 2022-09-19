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

    createProfile(createProfileDto: CreateProfileDto) {
        return new this.model({
            ...createProfileDto,
            createdAt: new Date(),
          }).save();
    }
}
