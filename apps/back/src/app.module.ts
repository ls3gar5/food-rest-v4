import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers';
import { CacheStoreModule } from '@pepa/cache';
import { CHECKOUT_CACHE } from './config';

@Module({
  imports: [
    ControllersModule,
    CacheStoreModule.forRoot(
    {
        connectionString: 'redis://localhost:6379',
        password: 'yourStrongPassword123',
    },
    [{ name: CHECKOUT_CACHE }]),
  ],
  providers: [],
})
export class AppModule {}
