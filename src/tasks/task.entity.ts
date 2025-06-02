import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Expose } from 'class-transformer';


@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  @Expose({ name: 'due_date' })
  dueDate: string;

  @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE', eager: true })
  user: User;
}