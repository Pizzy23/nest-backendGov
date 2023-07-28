import { Controller, Post, Put, Delete, Body, Headers } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FamilyDTO } from 'src/dto/resident/resident-dto';
import { StringResDTO } from 'src/dto/response/response-dto';
import { ResidentService } from 'src/services/resident/resident-service';

@ApiTags('Resident')
@Controller('/resident')
export class ResidentController {
  constructor(private readonly service: ResidentService) {}
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Register new Resident',
  })
  @Post('')
  async postRegister(@Body() input: FamilyDTO) {
    return await this.service.calls(input);
  }
}
