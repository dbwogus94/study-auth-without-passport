import { ACCESS_TOKEN_TAG } from '@lib/common';
import { AppConfig } from '../app.config';

export const localConfig: AppConfig = {
  appName: '2-auth-without-passport-ver2',
  port: +3000,
  swagger: {
    docsOption: {
      info: {
        title: '2-auth-without-passport-ver2 API',
        description: '2-auth-without-passport-ver2 서비스: API',
        version: '1.0',
      },
      securityConfig: {
        name: ACCESS_TOKEN_TAG,
        securityOptions: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Access JWT',
          description: 'Enter Access Token',
          in: 'header',
        },
      },
    },
  },
};
