import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  user_image: string;

  @Column({ nullable: true })
  auth: string;

  @Column({ default: false })
  isAdmin: boolean;
}
