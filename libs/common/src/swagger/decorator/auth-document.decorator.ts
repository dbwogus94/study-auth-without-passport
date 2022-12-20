import { applyDecorators } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { ACCESS_TOKEN_TAG } from '../constant';

type TokenType = typeof ACCESS_TOKEN_TAG;

export const ApiAuthDocument = (tokenType: TokenType) => {
  return applyDecorators(ApiSecurity(tokenType));
};
