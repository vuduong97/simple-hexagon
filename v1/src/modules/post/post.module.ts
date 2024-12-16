import { PostHTTPController } from "./infrastructure/controller";
import { PostInMemoryRepository } from "./infrastructure/repository";
import { PostService } from "./service";

export function setupPostHTTPModule() {
  // setup dependencies
  const repository = new PostInMemoryRepository();
  // const cacheRepository = new CacheTopicRepository(repository);

  const service = new PostService(repository);
  const httpController = new PostHTTPController(service);

  return httpController.getRoute();
}
