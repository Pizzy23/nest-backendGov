import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from '../../../src/services';
import { LoginEntity } from 'src/entity/login/login-entity';
import { PutLogin, PutLogout } from 'src/dto/login/login-dto';

describe('LoginService', () => {
  let loginService: LoginService;
  let loginEntity: LoginEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService, { provide: LoginEntity, useValue: {} }],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
    loginEntity = module.get<LoginEntity>(LoginEntity);
  });

  describe('putLogin', () => {
    it('should log in the user and return a success message and status 200', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        offline: true,
      };
      jest.spyOn(loginEntity, 'getUser').mockResolvedValue(mockUser);
      jest.spyOn(loginService, 'compare').mockResolvedValue(true);

      // Create a mock PutLogin object
      const putLogin: PutLogin = {
        email: 'user@example.com',
        password: 'password123',
      };
      const result = await loginService.putLogin(putLogin);
      expect(loginEntity.getUser).toHaveBeenCalledWith(putLogin.email);
      expect(loginService.compare).toHaveBeenCalledWith(
        putLogin.password,
        mockUser.password,
      );
      expect(loginEntity.putLogin).toHaveBeenCalledWith(putLogin.email);
      expect(result).toEqual({ res: 'User logged in', status: 200 });
    });

    it('should return Password Incorrect and status 401 if compare method returns false', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        offline: true,
      };
      jest.spyOn(loginEntity, 'getUser').mockResolvedValue(mockUser);
      jest.spyOn(loginService, 'compare').mockResolvedValue(false);
      const putLogin: PutLogin = {
        email: 'user@example.com',
        password: 'password123',
      };

      const result = await loginService.putLogin(putLogin);

      expect(loginEntity.getUser).toHaveBeenCalledWith(putLogin.email);
      expect(loginService.compare).toHaveBeenCalledWith(
        putLogin.password,
        mockUser.password,
      );
      expect(loginEntity.putLogin).not.toHaveBeenCalled();
      expect(result).toEqual({ res: 'Password Incorrect', status: 401 });
    });
  });

  describe('putLogout', () => {
    it('should log out the user and return a success message and status 200', async () => {
      const putLogout: PutLogout = {
        email: 'user@example.com',
      };
      const result = await loginService.putLogout(putLogout);
      expect(loginEntity.putLogout).toHaveBeenCalledWith(putLogout.email);
      expect(result).toEqual({ res: 'User logged out', status: 200 });
    });
  });
});
