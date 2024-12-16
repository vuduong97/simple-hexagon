import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { IPostService } from 'modules/post/interfaces';
import TYPES from '../../../../common/type';

@controller('/v1/posts')
export class PostHTTPController {
  constructor(
    @inject(TYPES.PostService)
    private readonly postService: IPostService,
  ) {}

  @httpGet('/:id')
  async getPostAPI(req: Request, res: Response) {
    const { id } = req.params;
    const post = await this.postService.getPost(id);

    if (!post) {
      res.status(404).json({
        message: 'Post not found',
      });
      return;
    }

    res.status(200).json({
      data: post,
    });
  }
}
