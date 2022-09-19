import { ProfileModule } from './models/profile/profile.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProfileModule, 
    MongooseModule.forRoot(`mongodb+srv://craim:RFJ6jGEBCcWsd07r@cluster0.zi5zvli.mongodb.net/test`)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
