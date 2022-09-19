

import { Body, Post, Controller, Get } from '@nestjs/common';
import { CreateProfileDto } from './dto/createProfile.dto';

import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Post('/create')
    async create(@Body() createProfileDto: CreateProfileDto) {
        return this.profileService.createProfile(createProfileDto);
    }

    @Get()
    getProfile() {
        return "profile";
    }
}
