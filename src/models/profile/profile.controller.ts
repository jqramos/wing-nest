

import { Body, Post, Controller, Get, UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CreateProfileDto } from './dto/createProfile.dto';

import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    //nest js upload a file
    // web service to upload a file
    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    create(@Body() createProfileDto: CreateProfileDto, @UploadedFile() file: Express.Multer.File) {
        return this.profileService.createProfile(createProfileDto, file);
    }


    @Get()
    getProfile() {
        return "profile";
    }
}
