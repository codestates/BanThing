import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entity/users.entity';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {}
