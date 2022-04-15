import { ProfileModule } from './models/profile/profile.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProfileModule,
    MongooseModule.forRoot('mongodb://localhost:27017'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
