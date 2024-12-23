import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.schema';

@Schema({
  timestamps: {
    createdAt: 'created_date',
    updatedAt: 'updated_date',
  },
})
export class Post extends BaseEntity {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
