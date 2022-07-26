import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from "../../todos/models/todo.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({nullable: true})
  profileImg: string;

  @OneToMany(_type => TodoEntity, todo => todo.user, {eager: true})
  todos: TodoEntity[]
}