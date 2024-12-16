import { IPostRepository, IPostService } from "../interfaces";
import { Post } from "../model";

export class PostService implements IPostService {
  constructor(private readonly postRepository: IPostRepository) {}

  async getPost(id: string): Promise<Post | null> {
    return await this.postRepository.findById(id);
  }
}
