

import { Body, Post, Controller, Get, UseInterceptors, Logger } from '@nestjs/common';
import { Query, UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CreateProfileDto } from './dto/createProfile.dto';

import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    private readonly logger = new Logger(ProfileController.name);
    constructor(private profileService: ProfileService) {}

    //nest js upload a file
    // web service to upload a file
    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    create(@Body() createProfileDto: CreateProfileDto, @UploadedFile() file: Express.Multer.File) {
        return this.profileService.createProfile(createProfileDto, file);
    }

    @Get('/list')
    getPagedProfiles(@Query ('page') page: number, @Query ('limit') limit: number) {
        this.logger.log(`Getting stuff page: ${page} limit: ${limit}`);
        return this.profileService.getPagedProfiles(page, limit);
    }

    @Get()
    getProfile() {
        return "profile";
    }
}
