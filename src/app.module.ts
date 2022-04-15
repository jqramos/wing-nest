import { ControllersModule } from './controllers/controllers.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
