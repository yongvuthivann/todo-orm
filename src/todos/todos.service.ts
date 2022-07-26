import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoEntity } from "./models/todo.entity";
import { Repository } from "typeorm";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { TodoStatusEnum } from "./enums/todo-status.enum";
import { UserEntity } from "../users/models/user.entity";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>
  ) {}

  async create(
    createTodoDto: CreateTodoDto,
    user: UserEntity
  ): Promise<TodoEntity> {
    const { todo } = createTodoDto
    const newTodo = this.todoRepo.create({
      todo,
      status: TodoStatusEnum.OPEN,
      user
    })
    await this.todoRepo.save(newTodo)
    return newTodo
  }

  async findAll(user: UserEntity): Promise<TodoEntity[]> {
    const query = this.todoRepo.createQueryBuilder('todo')
    query.where({ user })
    try {
      return await query.getMany()
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string, user: UserEntity): Promise<TodoEntity> {
    const todo = await this.todoRepo.findOne({
      where: { id, user }
    })
    return todo
  }

  async update(id: string, status: TodoStatusEnum, user: UserEntity): Promise<TodoEntity> {
    const todo = await this.findOne(id, user)
    todo.status = status
    const updatedTodo = await this.todoRepo.save(todo)
    return updatedTodo
  }

  async delete(id: string, user: UserEntity): Promise<void> {
    const result = await this.todoRepo.delete({ id, user })

    if (result.affected === 0) {
      throw new NotFoundException("Todo not found")
    }
  }
}
