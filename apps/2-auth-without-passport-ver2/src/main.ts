import { buildSwagger } from '@lib/common';
import { validationPipeOptions } from '@lib/common/option/validation-pipe.options';
import { SwaggerConfig } from '@lib/config';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await bootServer();
  const configService = app.get(ConfigService);
  preInitServer(app, configService);
  await initServer(app, configService);
}
bootstrap();

async function bootServer(): Promise<INestApplication> {
  const appName = process.env.APP_NAME ?? 'Nest APP';
  return await NestFactory.create<INestApplication>(AppModule, {
    logger: new Logger(appName),
  });
}

function preInitServer(app: INestApplication, config: ConfigService): void {
  const { docsOption } = config.get<SwaggerConfig>('swagger');
  app.use(helmet());
  app.enableCors({ origin: '*' });
  buildSwagger('/docs', app, docsOption);
}

async function initServer(app: INestApplication, config: ConfigService) {
  await app
    .useGlobalPipes(new ValidationPipe(validationPipeOptions))
    .setGlobalPrefix('/api')
    .listen(config.get('port'));
}
