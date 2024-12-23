import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/shared/base/base.abstract.repository';
import { IPostRepository } from '../../interfaces';
import { Post } from '../../model';

@Injectable()
export class PostInMemoryRepository
  extends BaseRepositoryAbstract<Post>
  implements IPostRepository
{
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {
    super(postModel);
  }

  async findById(id: string): Promise<Post | null> {
    return await this.postModel.findById(id);
  }
}
