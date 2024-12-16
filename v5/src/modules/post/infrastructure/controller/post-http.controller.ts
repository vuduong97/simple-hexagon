import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { POST_SERVICE } from '../../post.di-token';
import { PostService } from '../../service';

@Controller('/v1/posts')
export class PostHTTPController {
  constructor(
    @Inject(POST_SERVICE)
    private readonly postService: PostService,
  ) {}

  @Get('/:id')
  async getPostAPI(@Param('id') id: string, @Res() res: Response) {
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
