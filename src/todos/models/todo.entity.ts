import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatusEnum } from "../enums/todo-status.enum";
import { UserEntity } from "../../users/models/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  todo: string;

  @Column()
  status: TodoStatusEnum;

  @Column({ type:"timestamp",default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(_type  => UserEntity, user => user.todos, { eager: false })
  @Exclude({toPlainOnly: true})
  user: UserEntity
}