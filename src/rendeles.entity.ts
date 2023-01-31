import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Csavar } from './csavar.entity';

@Entity()
export class Rendeles {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  csavar_id: number;
  @Column()
  db: number;
  @OneToMany(() => Csavar, (csavar) => csavar.rendeles)
  csavarok: Csavar[];
}
