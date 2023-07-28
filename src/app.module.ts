import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoginController, RegisterController } from './controllers/';

import { BaseService, LoginService, RegisterService } from './services';

import {
  PrismaModule,
  PrismaService,
  RequestLoggerMiddleware,
} from './config/';
import { ResidentController } from './controllers/resident/resident-controller';
import { ResidentService } from './services/resident/resident-service';
import { HomeService } from './services/home/home-service';
import { HomeController } from './controllers/home/home-controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    RegisterController,
    LoginController,
    ResidentController,
    HomeController,
  ],
  providers: [
    BaseService,
    PrismaService,
    RegisterService,
    LoginService,
    ResidentService,
    HomeService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
