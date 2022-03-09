import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getAll() {
    const result = await createQueryBuilder('Users')
      .select(['Users.nickname', 'Users.auth', 'Users.isAdmin'])
      .getMany();
    return result;
  }

  async deleteAccount(nickname: string): Promise<any> {
    const result = await this.userRepository.findOne({ nickname });
    if (result) {
      this.userRepository.delete({ nickname });
      return { data: null, message: 'delete was success' };
    }

    return { data: null, message: `account you're looking for is not exist` };
  }
}
