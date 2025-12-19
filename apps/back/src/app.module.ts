import { Logger, Module } from '@nestjs/common';
import { ControllersModule } from './controllers';
import { CacheStoreModule } from '@pepa/cache';
import { CHECKOUT_CACHE } from './config';
import { B2bCheckoutEntityLibModule} from '@telecom-argentina/b2b-checkout-entity-lib';

@Module({
  imports: [
    CacheStoreModule.forRoot(
    {
        connectionString: 'redis://localhost:6379',
        password: process.env.REDIS_PASSWORD,
    },
    [{ name: CHECKOUT_CACHE }]),
    B2bCheckoutEntityLibModule.forRoot({
            databaseOptions: {
                type: 'postgres',
                port: 5432,
                username: 'postgres',
                password: 'admin',
                database: 'postgres',
                synchronize: false,
                logging: false,
                host: 'localhost',
                hostReader: 'localhost',
                name: 'default',
            },
        }),
    ControllersModule,
  ],
  providers: [Logger],
})
export class AppModule {}
