import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { womController } from './routes/wom/wom.controller';
import { womService } from './routes/wom/wom.service';

@Module({
  imports: [],
  controllers: [AppController, womController],
  providers: [AppService, womService],
})

export class AppModule {}
