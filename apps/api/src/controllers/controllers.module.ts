import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';

@Module({
  controllers: [HealthController, UserController],
  providers: [UserService],
})
export class ControllersModule {}
