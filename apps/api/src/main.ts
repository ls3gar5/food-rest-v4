import { Logger } from '@nestjs/common';
import { RestApplicationFactory } from '@pepa/platform-rest';
import { AppModule } from './app.module';
import { environment } from './config';
import { options } from './app.options';
import { loadRuntimeContext } from './runtime-context.factory';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const port = environment.port;
  const runtimeContext = await loadRuntimeContext('food-rest-v4-api');

  // Rest application factory
  const app = await RestApplicationFactory.create(
    AppModule,
    options,
    runtimeContext,
  );

  const config = new DocumentBuilder()
    .setTitle('APICO example')
    .setDescription('APICO description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port, () => {
    Logger.log(`Running ${runtimeContext.appName}@${runtimeContext.version} as ${runtimeContext.stage} at http://localhost:${port}`, 'Main');
  });

}

bootstrap();
