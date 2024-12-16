import { Module, Provider } from '@nestjs/common';
import { PostHTTPController } from './infrastructure/controller/post-http.controller';
import { POST_REPOSITORY, POST_SERVICE } from './post.di-token';
import { PostInMemoryRepository } from './infrastructure/repository';
import { PostService } from './service';

const dependencies: Provider[] = [
  { provide: POST_SERVICE, useClass: PostService },
  { provide: POST_REPOSITORY, useClass: PostInMemoryRepository },
];

@Module({
  imports: [],
  controllers: [PostHTTPController],
  providers: [...dependencies],
})
export class PostModule {}
