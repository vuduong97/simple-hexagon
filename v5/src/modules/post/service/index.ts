import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import TYPES from '../../../common/type';
import { IPostRepository, IPostService } from '../interfaces';
import { Post } from '../model';

@provide(TYPES.PostService)
export class PostService implements IPostService {
  constructor(
    @inject(TYPES.PostRepository)
    private readonly postRepository: IPostRepository,
  ) {}

  async getPost(id: string): Promise<Post | null> {
    return await this.postRepository.findById(id);
  }
}
