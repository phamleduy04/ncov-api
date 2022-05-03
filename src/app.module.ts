import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ncovController } from './routes/wom/wom.controller';
import { womService } from './routes/wom/wom.service';

@Module({
  imports: [],
  controllers: [AppController, ncovController],
  providers: [AppService, womService],
})

export class AppModule {}
