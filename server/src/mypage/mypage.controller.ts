import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/token/auth.guard';
import { MypageService } from './mypage.service';
import { TransPasswordDTO } from 'src/dto/transpassword.dto';

@Controller('mypage')
export class MypageController {
  constructor(private myPageService: MypageService) {}

  @Get() //마이페이지
  @UseGuards(AuthGuard)
  async userInfo(@Req() req: Request): Promise<object> {
    return await this.myPageService.userInfo(req.user);
  }

  @Post() //비밀번호 변경
  @UseGuards(AuthGuard)
  async editPassword(
    @Req() req: Request,
    @Body() password: TransPasswordDTO,
  ): Promise<any> {
    return await this.myPageService.editPassword(req.user, password);
  }
}
