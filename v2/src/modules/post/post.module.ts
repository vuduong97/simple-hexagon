import TYPES from "../../common/type";
import { container } from "../../di/inversify.config";
import { PostHTTPController } from "./infrastructure/controller";
import { IPostService } from "./interfaces";

export function setupPostHTTPModule() {
  const service = container.get<IPostService>(TYPES.PostService);
  const httpController = new PostHTTPController(service);

  return httpController.getRoute();
}
