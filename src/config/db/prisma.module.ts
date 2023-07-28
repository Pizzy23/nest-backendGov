import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { LoginEntity, RegisterEntity } from 'src/entity';
import { ResidentEntity } from 'src/entity/resident/resident-entity';
import { HomeEntity } from 'src/entity/home/home-entity';

@Module({
  providers: [
    PrismaService,
    RegisterEntity,
    LoginEntity,
    ResidentEntity,
    HomeEntity,
  ],
  exports: [
    PrismaService,
    RegisterEntity,
    LoginEntity,
    ResidentEntity,
    HomeEntity,
  ],
})
export class PrismaModule {}
