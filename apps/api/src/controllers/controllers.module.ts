import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { HttpModule } from '@nestjs/axios';
import { HttpClientModule } from '@pepa/http-client';

@Module({
  imports: [HttpModule,
            HttpClientModule.forRoot([
            {
                name: 'SERVICE_API',
            },
        ]),
  ],
  controllers: [HealthController, UserController],
  providers: [UserService],
})
export class ControllersModule {}
