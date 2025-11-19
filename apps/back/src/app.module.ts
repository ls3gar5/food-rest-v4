import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers';

@Module({
  imports: [
    ControllersModule,
  ],
  providers: [],
})
export class AppModule {}
