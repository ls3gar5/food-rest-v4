import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from '../services/health.service';
import { HttpModule } from '@nestjs/axios';
import { HttpClientModule } from '@pepa/http-client';
import { CHECKOUT_SERVICE_API } from '../config';
import { BnplController } from './bnpl.controller';
import { BnplService } from '../services/bnpl.service';

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
              name: CHECKOUT_SERVICE_API,
            }
        ]),
  ],
  controllers: [HealthController, BnplController],
  providers: [HealthService, BnplService],
})
export class ControllersModule {}
