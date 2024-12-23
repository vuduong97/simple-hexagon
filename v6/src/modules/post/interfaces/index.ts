import { IBaseRepository } from 'src/shared/base/base.interface.repository';
import { Post } from '../model';
import { CreatePostDto } from '../model/create-post.dto';

export interface IPostService {
  getPost(id: string): Promise<Post | null>;

  create(createPostDto: CreatePostDto): Promise<Post>;
}

export interface IPostRepository extends IBaseRepository<Post> {
  findById(id: string): Promise<Post | null>;
}
