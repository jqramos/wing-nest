import { Module } from '@nestjs/common';
import { HomeController } from './home/home.controller';

@Module({
  imports: [],
  controllers: [HomeController],
  providers: [],
})
export class ControllersModule {}
