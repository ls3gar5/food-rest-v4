import { Logger } from '@nestjs/common';
import { RestApplicationFactory } from '@pepa/platform-rest';
import { AppModule } from './app.module';
import { environment } from './config';
import { options } from './app.options';
import { loadRuntimeContext } from './runtime-context.factory';

async function bootstrap() {

  const port = 3006;
  const runtimeContext = await loadRuntimeContext('-back');

  // Rest application factory
  const app = await RestApplicationFactory.create(
    AppModule,
    options,
    runtimeContext,
  );

  await app.listen(port, () => {
    Logger.log(`Running ${runtimeContext.appName}@${runtimeContext.version} as ${runtimeContext.stage} at http://localhost:${port}`, 'Main');
  });

}

bootstrap();
