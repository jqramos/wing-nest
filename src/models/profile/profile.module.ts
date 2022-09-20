import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/schemas/profile.schema';
import { StorageModule } from '../storage/storage.module';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]), StorageModule],
  controllers: [ProfileController],
  providers: [ProfileService, StorageService],
  exports: [ProfileService]
})
export class ProfileModule {}
