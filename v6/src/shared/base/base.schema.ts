import { Prop } from '@nestjs/mongoose';

export class BaseEntity {
  @Prop({ default: null })
  deleted_at: Date; // Dùng cho soft delete
}
