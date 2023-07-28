import { Test, TestingModule } from '@nestjs/testing';
import { HomeService } from '../../../src/services';
import { HomeEntity } from 'src/entity/home/home-entity';
import {
  GameficationDTO,
  InputDto,
  InputDocsDto,
  MaxDocsDto,
} from 'src/dto/home/home-dto';

describe('HomeService', () => {
  let homeService: HomeService;
  let homeEntity: HomeEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        { provide: HomeEntity, useValue: {} }, // Replace with a mock or stub if needed
      ],
    }).compile();

    homeService = module.get<HomeService>(HomeService);
    homeEntity = module.get<HomeEntity>(HomeEntity);
  });

  describe('gamefication', () => {
    it('should return gamefication data with status 200', async () => {
      jest
        .spyOn(homeEntity, 'getAllDocuments')
        .mockResolvedValue({ maxDocs: 200 });
      jest
        .spyOn(homeEntity, 'getAllDocsGlobal')
        .mockResolvedValue({ docs: 100 });

      const result = await homeService.gamefication();
      expect(result.res.meta).toBeDefined();
      expect(result.res.actual).toBeDefined();
      expect(result.res.time).toEqual('30 dias');
      expect(result.res.porcent).toBeGreaterThan(0);
      expect(result.res.porcent).toBeLessThanOrEqual(100);
      expect(result.status).toEqual(200);
    });

    // Add other test cases for error scenarios
  });

  describe('map', () => {
    it('should return map data with status 200', async () => {
      const result = await homeService.map();
      expect(result.res.incomplet).toBeDefined();
      expect(result.res.semiIncomplet).toBeDefined();
      expect(result.res.complet).toBeDefined();
      expect(result.status).toEqual(200);
    });
  });

  describe('offline', () => {
    it('should put the user in offline mode and return success message with status 200', async () => {
      const input: InputDto = { email: 'user@example.com' };

      jest.spyOn(homeEntity, 'putOffline');

      const result = await homeService.offline(input);

      // Assertions
      expect(result.res).toEqual('User Offline Mode');
      expect(result.status).toEqual(200);
      expect(homeEntity.putOffline).toHaveBeenCalledWith(input);
    });
  });
});
