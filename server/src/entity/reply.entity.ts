import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post)
  @JoinColumn()
  post_id: number;

  @Column()
  nickname: string;

  @Column()
  reply: string;

  @CreateDateColumn()
  time: Date;
}
