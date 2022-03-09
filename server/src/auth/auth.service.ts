import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDTO } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from '../token/payload';
import { Users } from '../entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { SignUpDTO } from 'src/dto/signup.dto';
import { UserInfoDTO } from 'src/dto/userInfo.dto';
import { SignUpValidateDTO } from 'src/dto/signupValidate.dto';
import axios from 'axios';
import { SnsSignUpDTO } from 'src/dto/snsSignUP.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../post/post.repository';
import { ReplyLogRepository } from '../post/reply.repository';
import { PostService } from 'src/post/post.service';
import { cookieSetting } from 'src/functions/cookiemaker.function'; //!녹두가 추가

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private postService: PostService,
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    @InjectRepository(ReplyLogRepository)
    private replyLogRepository: ReplyLogRepository,
  ) {}

  //아이디 중복확인
  async idValidate(validate: SignUpValidateDTO): Promise<object> {
    const userFind: SignUpValidateDTO = await this.userService.findByFields({
      where: { user_id: validate.user_id },
    });
    if (userFind) {
      throw new HttpException('존재하는 아이디 입니다', HttpStatus.BAD_REQUEST);
    }
    return { data: null, message: '사용 가능' };
  }

  //닉네임 중복확인
  async nicknameValidate(validate: SignUpValidateDTO): Promise<object> {
    const nickFind: SignUpDTO = await this.userService.findByFields({
      where: { nickname: validate.nickname },
    });
    if (nickFind) {
      throw new HttpException('존재하는 닉네임 입니다', HttpStatus.BAD_REQUEST);
    }
    return { data: null, message: '사용 가능' };
  }

  //회원가입
  async signUp(newUser: SignUpDTO): Promise<object> {
    await this.userService.save(newUser);
    return { data: null, message: '회원가입 완료' };
  }

  //회원탈퇴
  async signOut(user: any, res: Response, req: Request): Promise<object> {
    const list = await this.postRepository.find({ host_user_id: user.user_id });

    if (list) {
      for (const e of list) {
        this.replyLogRepository.delete({ post_id: e.id });
        this.postRepository.delete({ id: e.id });
      }
    }
    await this.postRepository.delete({ host_user_id: user.user_id });
    await this.userService.delete(user.user_id);

    if (user.auth === 'kakao') {
      const token = req.cookies['kat'];
      const _url = 'https://kapi.kakao.com/v1/user/unlink';
      const _header = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(_url, {}, { headers: _header });

      res.cookie('inner', '', { ...cookieSetting(-1) });
      res.cookie('kat', '', { ...cookieSetting(-1) });
      return res
        .cookie('accessToken', '', { ...cookieSetting(-1) })
        .send({ data: null, message: '회원탈퇴 완료' });
    }

    return res
      .cookie('accessToken', '', { ...cookieSetting(-1) })
      .send({ data: null, message: '회원탈퇴 완료' });
  }

  //로그인
  async logIn(loginDTO: LoginDTO, res: Response): Promise<object> {
    const userFind: Users = await this.userService.findByFields({
      where: { user_id: loginDTO.user_id },
    });
    if (!userFind) {
      throw new UnauthorizedException('잘못된 인증 정보 입니다!');
    }

    //비밀번호 복호화 및 검증
    const validatePassword = await bcrypt.compare(
      loginDTO.password,
      userFind.password,
    );
    if (!validatePassword) {
      throw new UnauthorizedException('잘못된 인증 정보 입니다!');
    }
    const payload: Payload = { id: userFind.id, user_id: userFind.user_id };
    const token = this.jwtService.sign(payload);

    return res
      .cookie('accessToken', token, { ...cookieSetting(20 * 60 * 60 * 24) })
      .send({
        data: { accessToken: token },
        message: '로그인 완료',
      });
  }

  //카카오 로그인
  async kakaoLogin(code: string, res: Response): Promise<any> {
    const _restApiKey = process.env.KAKAO_ID;
    const _redirect_url = `${process.env.SERVER_ENDPOINT}/users/kakaoLoginRedirect`;
    const _hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${_restApiKey}&redirect_url=${_redirect_url}&code=${code}`;
    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    const data = await axios.post(_hostName, {}, headers);

    const _header = {
      Authorization: `Bearer ${data.data['access_token']}`,
    };
    const sign = await axios.post(
      'https://kapi.kakao.com/v2/user/me',
      {},
      { headers: _header },
    );

    let userFind: Users = await this.userService.findByFields({
      where: { user_id: sign.data.kakao_account.email },
    });

    //DB 회원테이블에 유저가 없으면 회원가입
    if (!userFind) {
      const snsSignUp: SnsSignUpDTO = {
        user_id: sign.data.kakao_account.email,
        nickname: sign.data.properties.nickname,
        auth: 'kakao',
      };
      await this.userService.snsSave(snsSignUp);
      userFind = await this.userService.findByFields({
        where: { user_id: sign.data.kakao_account.email },
      });
    }

    const payload: Payload = { id: userFind.id, user_id: userFind.user_id };
    const token = this.jwtService.sign(payload);

    res.cookie('inner', 'true', { ...cookieSetting(20 * 60 * 60 * 24) });
    res.cookie('accessToken', token, { ...cookieSetting(20 * 60 * 60 * 24) });
    return res
      .cookie('kat', data.data['access_token'], {
        ...cookieSetting(20 * 60 * 60 * 24),
      })
      .redirect(process.env.CORSORIGIN);
  }

  //로그아웃
  async logOut(res: Response, req: Request, user: any): Promise<object> {
    if (user.auth === 'kakao') {
      const token = req.cookies['kat'];
      const _url = 'https://kapi.kakao.com/v1/user/logout';
      const _header = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post(_url, {}, { headers: _header });

      res.cookie('kat', '', { ...cookieSetting(-1) });

      return res
        .cookie('accessToken', '', { ...cookieSetting(-1) })
        .send({ data: null, message: '로그아웃' });
    }
    return res
      .cookie('accessToken', '', { ...cookieSetting(-1) })
      .send({ data: null, message: '로그아웃' });
  }

  //토큰으로 사용자 정보 확인
  async tokenValidateUser(payload: Payload): Promise<UserInfoDTO> {
    return await this.userService.findByFields({
      where: { id: payload.id },
    });
  }
}
