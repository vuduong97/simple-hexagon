import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository, IPostService } from '../interfaces';
import { Post } from '../model';
import { CreatePostDto } from '../model/create-post.dto';
import { POST_REPOSITORY } from '../post.di-token';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: IPostRepository,
  ) {}

  async getPost(id: string): Promise<Post | null> {
    return await this.postRepository.findById(id);
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return await this.postRepository.create(createPostDto);
  }
}
