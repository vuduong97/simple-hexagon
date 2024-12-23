import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { IPostService } from '../../interfaces';
import { POST_SERVICE } from '../../post.di-token';
import { CreatePostDto } from '../../model/create-post.dto';

@Controller('/v1/posts')
export class PostHTTPController {
  constructor(
    @Inject(POST_SERVICE)
    private readonly postService: IPostService,
  ) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getPostAPI(@Param('id') id: string, @Res() res: Response) {
    const post = await this.postService.getPost(id);

    if (!post) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'Post not found',
      });
      return;
    }

    res.status(HttpStatus.OK).json({
      data: post,
    });
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }
}
