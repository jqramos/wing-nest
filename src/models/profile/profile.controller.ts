
import { Connection, Schema as MongooseSchema } from 'mongoose';

import { BadRequestException, Body, HttpStatus, Injectable, Post, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateProfileDto } from './dto/createProfile.dto';

import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Post('/create')
    async create(@Body() createProfileDto: CreateProfileDto) {
        return await this.profileService.createProfile(createProfileDto);;
    }

    getProfile() {
        return "profile";
    }
}
