import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseService } from '../base/baseService';
import { HomeEntity } from 'src/entity/home/home-entity';
import { InputDocsDto, InputDto, MaxDocsDto } from 'src/dto/home/home-dto';

@Injectable()
export class HomeService extends BaseService {
  constructor(private repository: HomeEntity) {
    super();
  }
  async gamefication() {
    try {
      const allDocs = await this.repository.getAllDocuments();
      const actualDocs = await this.repository.getAllDocsGlobal();
      const porcent = actualDocs.docs / 1000;
      let porcentFixed = porcent.toFixed(2);
      return {
        res: {
          meta: allDocs,
          actual: actualDocs,
          time: '30 dias',
          porcent: parseFloat(porcentFixed),
        },
        status: 200,
      };
    } catch (e) {
      throw new HttpException('message', 500, {
        cause: new Error(e),
      });
    }
  }
  async map() {
    return {
      res: {
        incomplet: { porcent: '10%', decimal: 0.1 },
        semiIncomplet: { porcent: '12%', decimal: 0.12 },
        complet: { porcent: '15%', decimal: 0.15 },
      },
      status: 200,
    };
  }
  async offline(input: InputDto) {
    try {
      this.repository.putOffline(input);
      return { res: 'User Offline Mode', status: 200 };
    } catch (e) {
      throw new HttpException('message', 500, {
        cause: new Error(e),
      });
    }
  }
  async docs(input: InputDocsDto) {
    try {
      this.repository.addNewDocs;
      return { res: 'doc is be add in db', status: 200 };
    } catch (e) {
      throw new HttpException('message', 500, {
        cause: new Error(e),
      });
    }
  }
  async allDocuments() {
    try {
      return await this.repository.getAllDocuments();
    } catch (e) {
      throw new HttpException('message', 500, {
        cause: new Error(e),
      });
    }
  }
  async addNewMaxDocs(input: MaxDocsDto) {
    try {
      await this.repository.postMaxDocs(input);
      return { res: 'New max is by instance', status: 201 };
    } catch (e) {
      throw new HttpException('message', 500, {
        cause: new Error(e),
      });
    }
  }
}
