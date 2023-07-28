import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/db/prisma.service';
import { InputDto, MaxDocsDto } from 'src/dto/home/home-dto';

@Injectable()
export class HomeEntity {
  constructor(private prisma: PrismaService) {}
  async addNewDocs() {
    let docs = await this.prisma.gamefication.findFirst({
      select: {
        docs: true,
      },
    });
    docs.docs = +1;
    await this.prisma.gamefication.create({
      data: {
        docs: docs.docs,
      },
    });
  }
  async getAllDocsGlobal() {
    return await this.prisma.gamefication.findFirst({
      select: {
        docs: true,
      },
    });
  }
  async getAllDocuments() {
    return await this.prisma.maxDocs.findFirst({
      select: {
        maxDocs: true,
      },
    });
  }
  async putOffline(input: InputDto) {
    const email = input.email;
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          offline: true,
        },
      });
    }
  }
  async postMaxDocs(input: MaxDocsDto) {
    await this.prisma.maxDocs.create({
      data: { maxDocs: input.max },
    });
  }
}
