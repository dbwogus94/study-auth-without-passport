import { SwaggerConfig } from '@lib/config';
import { BaseConfig } from '@lib/config';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AppConfig extends BaseConfig {
  @IsNotEmpty()
  @IsString()
  readonly appName: string;

  @IsNotEmpty()
  @IsNumber()
  readonly port: number = 80;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SwaggerConfig)
  readonly swagger: SwaggerConfig;
}
