import { Container } from "inversify";
import { IPostRepository, IPostService } from "modules/post/interfaces";
import TYPES from "../common/type";
import { PostInMemoryRepository } from "../modules/post/infrastructure/repository";
import { PostService } from "../modules/post/service";

const container = new Container();
container.bind<IPostService>(TYPES.PostService).to(PostService);
container.bind<IPostRepository>(TYPES.PostRepository).to(PostInMemoryRepository);

export { container };
