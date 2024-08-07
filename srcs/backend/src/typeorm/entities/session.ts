import { ISession } from 'connect-typeorm';
import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'sessions' })
export class TypeORMSession implements ISession {
  @Index()
  @Column('bigint')
  expiredAt: number;

  @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Column('text')
  json: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt?: Date;
}
