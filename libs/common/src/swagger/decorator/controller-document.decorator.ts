import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiControllerDocument = (apiTag: string) => {
  return applyDecorators(
    ApiBadRequestResponse({
      description: '요청이 유효성 검사를 통과하지 못하였습니다.',
    }),
    ApiNotFoundResponse({
      description: '요청한 자원이 존재하지 않거나 사용할 수 없습니다.',
    }),
    ApiUnauthorizedResponse({
      description: 'JWT가 만료되었거나 잘못되었습니다.',
    }),
    ApiTags(apiTag),
  );
};
