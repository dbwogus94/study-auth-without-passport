import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from './user.entity';

type PropertiesType = keyof User;
// eslint-disable-next-line @typescript-eslint/ban-types
type DecoratorType = Record<PropertiesType, Function>;

export function DocumentHelper(
  propertyName: PropertiesType,
): PropertyDecorator {
  return docsdecorators[propertyName]();
}

export function ValidateHelper(
  propertyName: PropertiesType,
): PropertyDecorator {
  return validDecorators[propertyName]();
}

export function PropertyHelper(
  propertyName: PropertiesType,
): PropertyDecorator {
  return applyDecorators(
    docsdecorators[propertyName](),
    validDecorators[propertyName](),
  );
}

const docsdecorators: DecoratorType = {
  id: () => applyDecorators(ApiProperty({ description: 'User PK' })),
  username: () => applyDecorators(ApiProperty({ description: 'User ID' })),
  password: () => applyDecorators(ApiProperty({ description: 'User PW' })),
  email: () => applyDecorators(ApiProperty({ description: 'User Email' })),
  createdAt: () => applyDecorators(ApiProperty({ description: 'User 생성일' })),
  updatedAt: () => applyDecorators(ApiProperty({ description: 'User 수정일' })),
};

const validDecorators: DecoratorType = {
  id: () => applyDecorators(Expose(), IsOptional()),
  username: () => applyDecorators(Expose(), IsNotEmpty()),
  password: () => applyDecorators(Expose(), IsNotEmpty()),
  email: () => applyDecorators(Expose(), IsOptional()),
  createdAt: () => applyDecorators(Expose(), IsOptional()),
  updatedAt: () => applyDecorators(Expose(), IsOptional()),
};

// TODO: 공통화를 위해 테스트 진행중
// export function DocumentHelper<T, K extends keyof T>(
//   entity: Type<T>,
//   propertyName: K,
// ): PropertyDecorator {
//   return docdecorators[propertyName]();
// }

// export function ValidateHelper<T, K extends keyof T>(
//   entity: Type<T>,
//   propertyName: K,
// ): PropertyDecorator {
//   return validDecorators[propertyName]();
// }

// export function PropertyHelper<T, K extends keyof T>(
//   entity: Type<T>,
//   propertyName: K,
// ): PropertyDecorator {
//   return applyDecorators(
//     docdecorators[propertyName](),
//     validDecorators[propertyName](),
//   );
// }
