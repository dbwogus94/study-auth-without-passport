import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ACCESS_TOKEN_TAG } from '../constant/auth.constant';

export function ApiAuthDocument() {
  return applyDecorators(
    ApiBearerAuth(ACCESS_TOKEN_TAG),
    ApiUnauthorizedResponse({
      description:
        '[Authentication Error] Invalid credentials. (ex) token is expired',
    }),
  );
}
