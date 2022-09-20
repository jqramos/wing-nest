import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Profile, ProfileDocument } from "src/schemas/profile.schema";
import { CreateProfileDto } from "./dto/createProfile.dto";
import { Model } from 'mongoose';
import { StorageService } from "../storage/storage.service";

@Injectable()
export class ProfileService {
  
  private readonly logger = new Logger(ProfileService.name)
    constructor(
        @InjectModel(Profile.name) private readonly model: Model<ProfileDocument>,
        private storageService: StorageService
      ) {}

    createProfile(createProfileDto: CreateProfileDto, file: Express.Multer.File) {
      //multer get extension
      if(file) {
        createProfileDto.extension = file.originalname.split('.').pop();
        const path = `${createProfileDto.fileType}/${createProfileDto.title}.${createProfileDto.extension}`;
        console.log(path);
        this.storageService.save(
          path,
          file.mimetype,
          file.buffer,
          [{ mediaId: createProfileDto.title }]
        );
      }
      return new this.model({
          ...createProfileDto,
          createdAt: new Date()
        }).save();
    }

    //list of profiles page and limit
    //get image from gcp per profile
    //return list of profiles
    async getPagedProfiles(page: number, limit: number) {
      const profiles = this.model.find().skip(page * limit).limit(limit);
      const profilesWithImage = await Promise.all(
        (await profiles).map(async (profile) => {
          const signedUrl = await this.storageService.getSignedUrl(
            `${profile.fileType}/${profile.title}.${profile.extension}`,
          );
          profile.signedUrl = signedUrl;
          return profile;
        })
      );
      return profilesWithImage;
    }
}
