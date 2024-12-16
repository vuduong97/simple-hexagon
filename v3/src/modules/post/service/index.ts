import { inject, injectable } from "inversify";
import { IPostService, IPostRepository } from "../interfaces";
import { Post } from "../model";
import TYPES from "../../../common/type";

@injectable()
export class PostService implements IPostService {
  constructor(
    @inject(TYPES.PostRepository)
    private readonly postRepository: IPostRepository,
  ) {}

  async getPost(id: string): Promise<Post | null> {
    return await this.postRepository.findById(id);
  }
}
