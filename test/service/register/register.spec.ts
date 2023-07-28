import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from '../../../src/services';
import { RegisterEntity } from 'src/entity/register/register-entity';
import { InternalServerErrorException } from '@nestjs/common';
import { RegisterDto } from 'src/dto/register/register-dto';

// Mock the RegisterEntity repository
const mockRegisterEntity = () => ({
  putUserInDb: jest.fn(),
});

describe('RegisterService', () => {
  let registerService: RegisterService;
  let registerEntity: RegisterEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        { provide: RegisterEntity, useFactory: mockRegisterEntity },
      ],
    }).compile();

    registerService = module.get<RegisterService>(RegisterService);
    registerEntity = module.get<RegisterEntity>(RegisterEntity);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calls', () => {
    it('should add a new assistant to the database with encrypted password and offline set to false', async () => {
      const input: RegisterDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        offline: false,
      };

      // Mock the super.encrypt method to return the encrypted password
      jest
        .spyOn(registerService, 'encrypt')
        .mockImplementation(async () => 'encryptedPassword');

      await registerService.calls(input);

      expect(registerEntity.putUserInDb).toHaveBeenCalledWith({
        name: input.name,
        email: input.email,
        password: 'encryptedPassword',
        offline: false,
      });
    });

    it('should return a success message and status 201 when adding a new assistant', async () => {
      const input: RegisterDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        offline: false,
      };

      const result = await registerService.calls(input);

      expect(result).toEqual({ res: 'Novo assistente criado', status: 201 });
    });

    it('should throw InternalServerErrorException when password is not provided', async () => {
      const input: RegisterDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '',
        offline: false,
      };

      await expect(registerService.calls(input)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });

    it('should add a new assistant to the database with offline set to true if not provided', async () => {
      const input: RegisterDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        offline: true,
      };

      jest
        .spyOn(registerService, 'encrypt')
        .mockImplementation(async () => 'encryptedPassword');

      await registerService.calls(input);

      expect(registerEntity.putUserInDb).toHaveBeenCalledWith({
        name: input.name,
        email: input.email,
        password: 'encryptedPassword',
        offline: false,
      });
    });
  });
});
