import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseService } from '../base/baseService';
import { RegisterEntity } from 'src/entity/register/register-entity';
import { RegisterDto } from 'src/dto/register/register-dto';

@Injectable()
export class RegisterService extends BaseService {
  constructor(private repository: RegisterEntity) {
    super();
  }
  async calls(input: RegisterDto) {
    try {
      const password = super.checkPassword(input.password, input.password);
      if (password) {
        const newInput = {
          name: input.name,
          email: input.email,
          password: super.encrypt(input.password),
          offline: false,
        };
        await this.repository.putUserInDb(input);
        return { res: 'Novo assistente criado', status: 201 };
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
