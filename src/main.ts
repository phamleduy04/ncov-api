import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import executeSraper from '../scrapers/instances';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
};

executeSraper();
setInterval(executeSraper, 1800000);
bootstrap();
