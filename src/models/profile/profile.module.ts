import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/schemas/profile.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {}
