import { buildSwagger } from '@lib/common';
import { validationPipeOptions } from '@lib/common/option/validation-pipe.options';
import { SwaggerConfig } from '@lib/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootServer(): Promise<INestApplication> {
  return await NestFactory.create<INestApplication>(AppModule);
}

function preInitServer(app: INestApplication, config: ConfigService): void {
  const { docsOption } = config.get<SwaggerConfig>('swagger');
  app.use(helmet());
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('/api');
  buildSwagger('/docs', app, docsOption);
}

async function initServer(app: INestApplication, config: ConfigService) {
  await app
    .useGlobalPipes(new ValidationPipe(validationPipeOptions))
    .listen(config.get('port'));
}

async function bootstrap() {
  const app = await bootServer();
  const configService = app.get(ConfigService);
  preInitServer(app, configService);
  await initServer(app, configService);
}
bootstrap();
