import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { API_DOC_TYPE } from '../constant';
import { AccessTokenResponseDTO } from '../dto';

export const DocumentHelper = (docType: API_DOC_TYPE) => {
  return decorators[docType]();
};

// eslint-disable-next-line @typescript-eslint/ban-types
const decorators: Record<API_DOC_TYPE, Function> = {
  signup: () =>
    applyDecorators(
      ApiOperation({ summary: 'Auth API - Signup' }),
      ApiBadRequestResponse({
        description: 'Invalid Request Body',
      }),
      ApiConflictResponse({
        description: 'User with username ${username} already exists',
      }),
      ApiCreatedResponse({
        description: 'Success Signup',
        type: AccessTokenResponseDTO,
      }),
    ),
  login: () =>
    applyDecorators(
      ApiOperation({ summary: 'Auth API - Login' }),
      ApiBadRequestResponse({
        description: 'Invalid Request Body',
      }),
      ApiUnauthorizedResponse({
        description: 'Username or password may be incorrect. Please try again',
      }),
      ApiCreatedResponse({
        description: 'Success login',
        type: AccessTokenResponseDTO,
      }),
    ),
  me: () =>
    applyDecorators(
      ApiOperation({ summary: 'Auth API - Me' }),
      ApiUnauthorizedResponse({
        description: 'Invalid Access Token',
      }),
      ApiNoContentResponse({
        description: 'Success me',
      }),
    ),
};
