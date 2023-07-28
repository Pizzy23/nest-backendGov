import { Controller, Post, Put, Delete, Body, Headers } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from 'src/dto/register/register-dto';
import { StringResDTO } from 'src/dto/response/response-dto';
import { RegisterService } from 'src/services';

@ApiTags('Register')
@Controller('/register')
export class RegisterController {
  constructor(private readonly service: RegisterService) {}
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Register New User',
  })
  @Post('')
  async postRegister(@Body() input: RegisterDto) {
    return await this.service.calls(input);
  }
}
