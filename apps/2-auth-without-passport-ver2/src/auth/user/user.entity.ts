import { Exclude, Expose } from 'class-transformer';

export class User {
  @Expose()
  id!: string;
  @Expose()
  username!: string;
  @Exclude()
  password!: string;
  @Expose()
  email?: string;
  @Expose()
  createdAt!: Date;
  @Expose()
  updatedAt!: Date;
}
