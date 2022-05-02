import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ncovController } from './wom.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ncovController],
  providers: [AppService],
})
export class AppModule {}
