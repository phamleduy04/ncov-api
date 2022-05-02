import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('wom')
export class ncovController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}