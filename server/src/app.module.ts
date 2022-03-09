import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { PostModule } from './post/post.module';
import { Post } from './entity/post.entity';
import { Reply } from './entity/reply.entity';
import { MypageModule } from './mypage/mypage.module';
import { MainPageModule } from './main-page/main-page.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //* configModule : 우리 프로젝트에서는 환경변수를 설정하기 위해 사용함
      //* configModule을 isGlobal로 정해주면,
      //* 아래에 있는 AuthModule, PostModule 등에서 configModule을 imports에 작성하지 않아도 사용할 수 있다.
      //* 만약 isGlobal 옵션이 없다면 하위 모듈마다 일일히 명시해주어야 할 것.
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      //* Number를 안해도 정상동작하는거 같기도 한데, 우선은 lint에서는 error를 띄운다.
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Users, Post, Reply],
      synchronize: true, //테이블을 자동으로 생성 개발모드일때만 사용 운영모드일때는 삭제
    }),
    AuthModule,
    PostModule,
    MypageModule,
    MainPageModule,
    AdminModule,
    //* 루트모듈인 app.module.ts에서는 우리가 작성한 모든 모듈을 imports 배열에 명시해주어야 한다.
    //* 데이터베이스 연결하려면 app.module.ts에서 TypeOrmModule을 imports에 명시해야 한다.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*'); //middleware들은 consumer에다가 연결한다!
  }
}
