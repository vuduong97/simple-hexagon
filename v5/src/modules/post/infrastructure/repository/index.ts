import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../../interfaces';
import { Post } from '../../model';

const posts: Post[] = [
  {
    id: '1',
    title: 'Post 1',
    content: 'Content 1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable()
export class PostInMemoryRepository implements IPostRepository {
  async findById(id: string): Promise<Post | null> {
    return Promise.resolve(posts.find((post) => post.id === id) || null);
  }
}

// Proxy Pattern
export class CachePostRepository implements IPostRepository {
  private cachePost: Map<string, Post> = new Map();

  constructor(private readonly originRepo: IPostRepository) {}

  async findById(id: string): Promise<Post | null> {
    const cachedPost = this.cachePost.get(id);

    if (cachedPost) {
      return Promise.resolve(cachedPost);
    }

    const post = await this.originRepo.findById(id);

    if (post) {
      this.cachePost.set(id, post);
    }

    return post;
  }
}
