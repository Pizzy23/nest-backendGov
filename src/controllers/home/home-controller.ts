import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Headers,
  Get,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InputDocsDto, InputDto, MaxDocsDto } from 'src/dto/home/home-dto';
import { ObjectResDTO, StringResDTO } from 'src/dto/response/response-dto';
import { HomeService } from 'src/services/home/home-service';

@ApiTags('Home')
@Controller('/home')
export class HomeController {
  constructor(private readonly service: HomeService) {}
  @ApiOkResponse({ type: [ObjectResDTO] })
  @ApiOperation({
    summary: 'Get all for Gamefication',
  })
  @Get('/game')
  async getGamefication() {
    return await this.service.gamefication();
  }
  @ApiOkResponse({ type: [ObjectResDTO] })
  @ApiOperation({
    summary: 'Get all for mapping',
  })
  @Get('/map')
  async getMap() {
    return await this.service.map();
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Put user in offline Mode',
  })
  @Put('/off')
  async putOffline(@Body() input: InputDto) {
    return await this.service.offline(input);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Get Total docs and globla current docs',
  })
  @Get('/docs')
  async getDocs() {
    return await this.service.allDocuments();
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Post new docs in db',
  })
  @Post('/docs')
  async postDocs(@Body() input: InputDocsDto) {
    return await this.service.docs(input);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Post new docs in db',
  })
  @Post('/allDocs')
  async addNewMaxDocs(@Body() input: MaxDocsDto) {
    return await this.service.addNewMaxDocs(input);
  }
}
