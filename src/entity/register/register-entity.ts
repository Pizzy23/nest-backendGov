import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/db/prisma.service';
import { RegisterDto } from 'src/dto/register/register-dto';
@Injectable()
export class RegisterEntity {
  constructor(private prisma: PrismaService) {}
  async putUserInDb(user: RegisterDto) {
    await this.prisma.user.create({
      data: user,
    });
  }
}
