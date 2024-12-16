import { Post } from "../model";

export interface IPostService {
  getPost(id: string): Promise<Post | null>;
}

export interface IPostRepository {
  findById(id: string): Promise<Post | null>;
}
