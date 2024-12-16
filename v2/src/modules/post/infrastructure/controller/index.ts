import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IPostService } from "modules/post/interfaces";
import TYPES from "../../../../common/type";

@injectable()
export class PostHTTPController {
  constructor(
    @inject(TYPES.PostService)
    private readonly postService: IPostService,
  ) {}

  async getPostAPI(req: Request, res: Response) {
    const { id } = req.params;
    const post = await this.postService.getPost(id);

    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
      return;
    }

    res.status(200).json({
      data: post,
    });
  }

  getRoute(): Router {
    const router = Router();

    router.get("/posts/:id", this.getPostAPI.bind(this));

    return router;
  }
}
