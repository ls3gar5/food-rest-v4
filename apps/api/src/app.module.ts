import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers';
import { PepaCryptoModule } from '@pepa/crypto';
import { CacheStoreModule } from '@pepa/cache';

@Module({
  imports: [
    ControllersModule,
    PepaCryptoModule.forRoot({
      secretName: 'your-secret-name', // Nombre del secreto en AWS Secrets Manager
      region: 'us-east-1', // Región de AWS
      base64Encoded: false // Opcional: true si los secretos están codificados en base64
    }),
    CacheStoreModule.forRoot(
    {
        connectionString: 'redis://localhost:6379',
        password: process.env.REDIS_PASSWORD,
    },
    [{ name: 'checkout-login' }]),
  ],
  providers: [],
})
export class AppModule {}
