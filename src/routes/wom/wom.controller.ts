import { Controller, Get, Query } from '@nestjs/common';
import { womService } from './wom.service';

@Controller('wom')
export class ncovController {
    constructor(private readonly appService: womService) { }

    @Get()
    async getAllWom(@Query() query: { yesterday: string }): Promise<Object> {
        const yesterday = (query.yesterday == 'true');
        return this.appService.getWorldData(yesterday);
    }

    @Get('countries')
    async getAllCountries(@Query() query: { yesterday: string }): Promise<Object> {
        const yesterday = (query.yesterday == 'true');
        return this.appService.getAllCountries(yesterday);
    }
}