import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseService } from '../base/baseService';
import { ResidentEntity } from 'src/entity/resident/resident-entity';
import { FamilyDTO } from 'src/dto/resident/resident-dto';

@Injectable()
export class ResidentService extends BaseService {
  constructor(private repository: ResidentEntity) {
    super();
  }
  async calls(input: FamilyDTO) {
    try {
      await this.repository.putResidentInDB(input);
      return { res: 'Novo residente adicionado', status: 201 };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
