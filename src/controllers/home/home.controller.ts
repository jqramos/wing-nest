/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';

@Controller('home')
export class HomeController {
    
  @Get()
  getHello(): string {
    return "home";
  }
}
