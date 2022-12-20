import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { SignupRequestDTO } from '../dto';

export class SignupPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public transform(value: unknown, _metadata: ArgumentMetadata) {
    const errors: string[] = [];
    if (!this.valueHasPassAndConfPass(value)) {
      throw new BadRequestException('Invalid Request Body');
    }
    if (value.password.length < 12) {
      errors.push('password should be at least 12 characters long');
    }
    if (value.password !== value.confirmationPassword) {
      errors.push('password and confirmationPassword do not match');
    }
    if (errors.length) {
      throw new BadRequestException(errors.join('\n'));
    }
    return value;
  }

  /**
   * custom type guard
   * @param val
   * @returns boolean
   */
  private valueHasPassAndConfPass(val: unknown): val is SignupRequestDTO {
    return (
      typeof val === 'object' &&
      'password' in val &&
      'confirmationPassword' in val
    );
  }
}
