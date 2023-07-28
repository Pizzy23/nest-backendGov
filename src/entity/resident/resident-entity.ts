import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/db/prisma.service';
import { FamilyDTO } from 'src/dto/resident/resident-dto';
@Injectable()
export class ResidentEntity {
  constructor(private prisma: PrismaService) {}
  async putResidentInDB(input: FamilyDTO) {
    await this.prisma.family.create({
      data: {
        headOfTheFamily: input.headOfTheFamily,
        unicCad: input.unicCad,
        latitude: input.latitude,
        longitude: input.longitude,
      },
    });
  }
}
