import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { womController } from './routes/wom/wom.controller';
import { womService } from './routes/wom/wom.service';

import { cityVNController } from './routes/cityvn/cityvn.controller';
import { cityVNService } from './routes/cityvn/cityvn.service';

@Module({
  imports: [],
  controllers: [AppController, womController, cityVNController],
  providers: [AppService, womService, cityVNService],
})

// eslint-disable-next-line no-empty-function
export class AppModule {}
