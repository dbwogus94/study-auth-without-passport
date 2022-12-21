import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { API_DOC_TYPE } from '../constant/document.constant';

export const DocumentHelper = (docType: API_DOC_TYPE) => {
  return decorators[docType]();
};

// eslint-disable-next-line @typescript-eslint/ban-types
const decorators: Record<API_DOC_TYPE, Function> = {
  signup: () =>
    applyDecorators(
      ApiOperation({ summary: 'Auth API - Signup' }),
      ApiCreatedResponse({
        description: 'Success Signup',
        type: '',
      }),
    ),
  login: () =>
    applyDecorators(
      ApiOperation({ summary: 'Auth API - Login' }),
      ApiCreatedResponse({
        description: 'Success login',
        type: '',
      }),
    ),
  me: () =>
    applyDecorators(
      ApiOperation({ summary: 'Auth API - Me' }),
      ApiOkResponse({
        description: 'Success Me',
        type: '',
      }),
    ),
  refresh: () =>
    applyDecorators(
      ApiOperation({ summary: 'Auth API - Refresh' }),
      ApiOkResponse({
        description: 'Success Refresh',
        type: '',
      }),
    ),
  logout: () =>
    applyDecorators(
      ApiOperation({ summary: 'Auth API - Logout' }),
      ApiOkResponse({
        description: 'Success Logout',
        type: '',
      }),
    ),
};
