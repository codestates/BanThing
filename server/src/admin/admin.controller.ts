import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Delete,
  Req,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { AdminService } from './admin.service';
//? @Get(@Req req: Request)
//* Req, Res는 @nestjs/common에서 import 하는데,
//* Request, Response 같은 변수의 타입을 지정해 줄 때는 'express'로부터 import

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get() // 가입된 모든 유저 정보 가져오기
  async getAll(): Promise<any> {
    const result = await this.adminService.getAll();
    return result;
  }

  //  @Post() // 가입된 유저 어드민 권한으로 강제 탈퇴
  @Delete('/:nickname')
  async deleteOne(@Param('nickname') nickname: string): Promise<void> {
    const result = await this.adminService.deleteAccount(nickname);
    return result;
  }
}
