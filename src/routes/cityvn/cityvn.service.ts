import { Injectable } from '@nestjs/common';
import { get } from '../../../database';

@Injectable()
export class cityVNService {
    async getCityVN(oneweek: boolean) {
        const data = await get(oneweek ? 'ncovcity1week' : 'ncovcity');
        return data;
    }
}