import { Controller, Get, Param, Query } from '@nestjs/common';
import { womService } from './wom.service';
import type { WOMWorldData } from '../../../scrapers/wom.world';
import type { WOMUsState } from '../../../scrapers/wom.usstate';

@Controller('wom')
export class womController {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly appService: womService) { }

    @Get()
    async getAllWom(@Query() query: { yesterday: string }): Promise<Object> {
        const yesterday = (query.yesterday == 'true');
        return this.appService.getWorldData(yesterday);
    }

    @Get('countries')
    async getAllCountries(@Query() query: { yesterday: string }): Promise<WOMWorldData[]> {
        const yesterday = (query.yesterday == 'true');
        return this.appService.getAllCountries(yesterday);
    }

    @Get('countries/:country')
    async getCountryData(@Query() query: { yesterday: string }, @Param() param: { country: string }): Promise<WOMWorldData> {
        const yesterday = (query.yesterday == 'true');
        return this.appService.getCountryName(yesterday, param.country);
    }

    @Get('states')
    async getAllStatesData(@Query() query: { yesterday: string }): Promise<Object[]> {
        const yesterday = (query.yesterday == 'true');
        return this.appService.getAllUSSates(yesterday);
    }

    @Get('states/:state')
    async getStateData(@Query() query: { yesterday: string }, @Param() param: { state: string }): Promise<Object> {
        const yesterday = (query.yesterday == 'true');
        return this.appService.getUSState(yesterday, param.state);
    }


}