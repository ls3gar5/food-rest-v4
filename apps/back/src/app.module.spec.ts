
import { INestApplication } from '@nestjs/common';
import { RestModuleTestingFactory } from '@pepa/platform-rest/testing';
import request from 'supertest';
import { ControllersModule } from './controllers';
import { loadRuntimeContext } from './runtime-context.factory';

describe('AppModule api', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await RestModuleTestingFactory.createTestingModule({
      imports: [
        ControllersModule,
      ],
    }, await loadRuntimeContext('-back')).compile();

    // Important to load all modules
    app = moduleRef.createNestApplication();
    await app.init();

  });

  describe('api', () => {

    it('should GET /health response OK', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200, { status: 'READY' });
    });

    it('should GET /healthz response OK', () => {
      return request(app.getHttpServer())
        .get('/healthz')
        .expect(200, { status: 'OK' });
    });

  });

});
