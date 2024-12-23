import { Module, Post, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostHTTPController } from './infrastructure/controller/post-http.controller';
import { PostInMemoryRepository } from './infrastructure/repository';
import { POST_REPOSITORY, POST_SERVICE } from './post.di-token';
import { PostService } from './service';
import { PostSchema } from './model';

const dependencies: Provider[] = [
  { provide: POST_SERVICE, useClass: PostService },
  { provide: POST_REPOSITORY, useClass: PostInMemoryRepository },
];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostHTTPController],
  providers: [...dependencies],
})
export class PostModule {}
