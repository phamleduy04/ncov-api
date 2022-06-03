import { Controller, Get, Query } from '@nestjs/common';
import { cityVNService } from './cityvn.service';
import type { cityVNToday, cityVNOneWeek } from '../../../scrapers/cityvn';

@Controller('cityvn')
export class cityVNController {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly appService: cityVNService) { }

    @Get()
    async getCityVN(@Query() query: { oneweek: string }): Promise<cityVNOneWeek | cityVNToday> {
        const oneweek = (query.oneweek == 'true');
        return this.appService.getCityVN(oneweek);
    };
}