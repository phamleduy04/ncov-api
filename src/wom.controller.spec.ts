import { Test, TestingModule } from '@nestjs/testing';
import { womController } from './routes/wom/wom.controller';
import { womService } from './routes/wom/wom.service';

describe('AppController', () => {
    let appController: womController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [womController],
            providers: [womService],
        }).compile();

        appController = app.get<womController>(womController);
    });

    describe('root', () => {
        it('/wom correct type', async () => {
            const result = await appController.getAllWom({ yesterday: 'false' });
            expect(result).toBeDefined();
            expect(result).toHaveProperty('updated');
            expect(result).toHaveProperty('active');
            expect(result).toHaveProperty('cases');
            expect(result).toHaveProperty('recovered');
            expect(result).toHaveProperty('deaths');
            expect(result).toHaveProperty('critical');
            expect(result).toHaveProperty('todayCases');
            expect(result).toHaveProperty('todayDeaths');
            expect(result).toHaveProperty('todayRecovered');
            expect(result).toHaveProperty('affectedCountries');
        });

        it('/wom yesterday correct type', async () => {
            const result = await appController.getAllWom({ yesterday: 'true' });
            expect(result).toBeDefined();
            expect(result).toHaveProperty('updated');
            expect(result).toHaveProperty('active');
            expect(result).toHaveProperty('cases');
            expect(result).toHaveProperty('recovered');
            expect(result).toHaveProperty('deaths');
            expect(result).toHaveProperty('critical');
            expect(result).toHaveProperty('todayCases');
            expect(result).toHaveProperty('todayDeaths');
            expect(result).toHaveProperty('todayRecovered');
            expect(result).toHaveProperty('affectedCountries');
        });

        it('/wom/countries correct type', async () => {
            const result = await appController.getAllCountries({ yesterday: 'false' });
            expect(result).toBeDefined();
            expect(result).toBeInstanceOf(Array);
            result.forEach(element => {
                expect(element).toHaveProperty('updated');
                expect(element).toHaveProperty('countryInfo');
                expect(element.countryInfo).toHaveProperty('_id');
                expect(element.countryInfo).toHaveProperty('iso2');
                expect(element.countryInfo).toHaveProperty('iso3');
                expect(element.countryInfo).toHaveProperty('lat');
                expect(element.countryInfo).toHaveProperty('long');
                expect(element).toHaveProperty('active');
                expect(element).toHaveProperty('cases');
                expect(element).toHaveProperty('recovered');
                expect(element).toHaveProperty('deaths');
                expect(element).toHaveProperty('critical');
                expect(element).toHaveProperty('country');
            });
        });

        it('/wom/countries yesterday correct type', async () => {
            const result = await appController.getAllCountries({ yesterday: 'true' });
            expect(result).toBeDefined();
            expect(result).toBeInstanceOf(Array);
            result.forEach(element => {
                expect(element).toHaveProperty('updated');
                expect(element).toHaveProperty('countryInfo');
                expect(element.countryInfo).toHaveProperty('_id');
                expect(element.countryInfo).toHaveProperty('iso2');
                expect(element.countryInfo).toHaveProperty('iso3');
                expect(element.countryInfo).toHaveProperty('lat');
                expect(element.countryInfo).toHaveProperty('long');
                expect(element).toHaveProperty('active');
                expect(element).toHaveProperty('cases');
                expect(element).toHaveProperty('recovered');
                expect(element).toHaveProperty('deaths');
                expect(element).toHaveProperty('critical');
                expect(element).toHaveProperty('country');
            });
        });

        it('/wom/countries/ correct type', async () => {
            const result = await appController.getCountryData({ yesterday: 'false' }, { country: 'Vietnam' });
            expect(result).toBeDefined();
            expect(result).toHaveProperty('updated');
            expect(result).toHaveProperty('countryInfo');
            expect(result.countryInfo).toHaveProperty('_id');
            expect(result.countryInfo).toHaveProperty('iso2');
            expect(result.countryInfo).toHaveProperty('iso3');
            expect(result.countryInfo).toHaveProperty('lat');
            expect(result.countryInfo).toHaveProperty('long');
            expect(result).toHaveProperty('active');
            expect(result).toHaveProperty('cases');
            expect(result).toHaveProperty('recovered');
            expect(result).toHaveProperty('deaths');
            expect(result).toHaveProperty('critical');
            expect(result).toHaveProperty('country');
        });

        it('/wom/countries/ yesterday correct type', async () => {
            const result = await appController.getCountryData({ yesterday: 'true' }, { country: 'Vietnam' });
            expect(result).toBeDefined();
            expect(result).toHaveProperty('updated');
            expect(result).toHaveProperty('countryInfo');
            expect(result.countryInfo).toHaveProperty('_id');
            expect(result.countryInfo).toHaveProperty('iso2');
            expect(result.countryInfo).toHaveProperty('iso3');
            expect(result.countryInfo).toHaveProperty('lat');
            expect(result.countryInfo).toHaveProperty('long');
            expect(result).toHaveProperty('active');
            expect(result).toHaveProperty('cases');
            expect(result).toHaveProperty('recovered');
            expect(result).toHaveProperty('deaths');
            expect(result).toHaveProperty('critical');
            expect(result).toHaveProperty('country');
        });
    });

        it('/wom/countries/ correct alternative name', async () => {
            const result = await appController.getCountryData({ yesterday: 'false' }, { country: 'viet nam' });
            expect(result).toBeDefined();
            expect(result.country).toBe('Vietnam');
        });

        it('/wom/countries/ yesterday correct alternative name', async () => {
            const result = await appController.getCountryData({ yesterday: 'true' }, { country: 'viet nam' });
            expect(result).toBeDefined();
            expect(result.country).toBe('Vietnam');
        });

        it('/wom/countries/ correct iso2', async () => {
            const result = await appController.getCountryData({ yesterday: 'false' }, { country: 'vn' });
            expect(result).toBeDefined();
            expect(result.country).toBe('Vietnam');
        });

        it('/wom/countries/ yesterday correct iso2', async () => {
            const result = await appController.getCountryData({ yesterday: 'true' }, { country: 'vn' });
            expect(result).toBeDefined();
            expect(result.country).toBe('Vietnam');
        });

        it('/wom/countries/ correct id', async () => {
            const result = await appController.getCountryData({ yesterday: 'false' }, { country: '704' });
            expect(result).toBeDefined();
            expect(result.country).toBe('Vietnam');
        });

        it('/wom/countries/ yesterday correct id', async () => {
            const result = await appController.getCountryData({ yesterday: 'true' }, { country: '704' });
            expect(result).toBeDefined();
            expect(result.country).toBe('Vietnam');
        });

        it('/wom/countries/ incorrect name', async () => {
            const result = await appController.getCountryData({ yesterday: 'false' }, { country: 'aipsdhjashgfka' });
            expect(result).toBeNull();
        });

        it('/wom/countries/ yesteday incorrect name', async () => {
            const result = await appController.getCountryData({ yesterday: 'true' }, { country: 'aipsdhjashgfka' });
            expect(result).toBeNull();
        });

        
});
