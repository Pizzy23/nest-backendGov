import { Test, TestingModule } from '@nestjs/testing';
import { ResidentService } from '../../../src/services';
import { ResidentEntity } from 'src/entity/resident/resident-entity';
import { InternalServerErrorException } from '@nestjs/common';
import { FamilyDTO } from 'src/dto/resident/resident-dto';

// Mock the ResidentEntity repository
const mockResidentEntity = () => ({
  putResidentInDB: jest.fn(),
});

describe('ResidentService', () => {
  let residentService: ResidentService;
  let residentEntity: ResidentEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidentService,
        { provide: ResidentEntity, useFactory: mockResidentEntity },
      ],
    }).compile();

    residentService = module.get<ResidentService>(ResidentService);
    residentEntity = module.get<ResidentEntity>(ResidentEntity);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calls', () => {
    it('should add a new resident to the database', async () => {
      const input: FamilyDTO = {
        headOfTheFamily: 'John Doe',
        unicCad: '12345',
        latitude: 40.712776,
        longitude: -74.005974,
      };

      await residentService.calls(input);

      expect(residentEntity.putResidentInDB).toHaveBeenCalledWith(input);
    });

    it('should return a success message and status 201 when adding a new resident', async () => {
      const input: FamilyDTO = {
        headOfTheFamily: 'John Doe',
        unicCad: '12345',
        latitude: 40.712776,
        longitude: -74.005974,
      };

      const result = await residentService.calls(input);

      expect(result).toEqual({ message: 'Novo residente adicionado', status: 201 });
    });

    it('should throw InternalServerErrorException when adding a new resident fails', async () => {
      const input: FamilyDTO = {
        headOfTheFamily: 'John Doe',
        unicCad: '12345',
        latitude: 40.712776,
        longitude: -74.005974,
      };

      await expect(residentService.calls(input)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
