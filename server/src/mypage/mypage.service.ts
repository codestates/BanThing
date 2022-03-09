import { Injectable } from '@nestjs/common';
import { UserService } from 'src/auth/user.service';
import { TransPasswordDTO } from 'src/dto/transpassword.dto';
import { getConnection } from 'typeorm';
import { Users } from 'src/entity/users.entity';

@Injectable()
export class MypageService {
  constructor(private userService: UserService) {}

  //마이페이지
  async userInfo(user: any): Promise<object> {
    user.password = undefined;
    return { data: { userInfo: user }, message: '회원정보' };
  }

  //비밀번호 변경
  async editPassword(user: any, password: TransPasswordDTO) {
    user.password = password.password;
    await this.userService.transformPassword(user).then((transPassword) => {
      getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
          password: transPassword,
        })
        .where(`user_id = '${user.user_id}'`)
        .execute();
    });
    return { data: null, message: '비밀번호 변경 완료' };
  }
}
