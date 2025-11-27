import { Logger, Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { HttpModule } from '@nestjs/axios';
import { HttpClientModule } from '@pepa/http-client';
import { ApiCheckOutController } from './apiCheckOut.controller';
import { ApiCheckoutService } from '../services';
import { CHECKOUT_SERVICE_API } from '../config';

@Module({
  imports: [    
          HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 5000,
                maxRedirects: 5,
            }),
          }),
          HttpClientModule.forRoot([
            {
              name: 'SERVICE_API',
            },
            {
              name: CHECKOUT_SERVICE_API,
            }
        ]),
  ],
  controllers: [HealthController, UserController, ApiCheckOutController],
  providers: [UserService, ApiCheckoutService, Logger],
})
export class ControllersModule {}
