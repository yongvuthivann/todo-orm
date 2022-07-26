import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { TodoEntity } from "./models/todo.entity";
import { UpdateTodoDto } from "./dtos/update-todo.dto";
import { GetUserDecorator } from "../auth/decorators/get-user.decorator";
import { UserEntity } from "../users/models/user.entity";
import { AuthGuard } from "@nestjs/passport";

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Post('create')
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUserDecorator() user: UserEntity
    ): Promise<TodoEntity> {
    return this.todoService.create(createTodoDto, user)
  }

  @Get()
  getTodos(@GetUserDecorator() user: UserEntity): Promise<TodoEntity[]>{
    return this.todoService.findAll(user)
  }

  @Get(':id')
  getTodo(
    @Param('id') id: string,
    @GetUserDecorator() user: UserEntity
  ): Promise<TodoEntity>{
    return this.todoService.findOne(id, user)
  }

  @Patch(':id/status')
  updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @GetUserDecorator() user: UserEntity
  ): Promise<TodoEntity> {
    const { status } = updateTodoDto
    return this.todoService.update(id, status, user)
  }

  @Delete(':id')
  deleteTodo(
    @Param('id') id: string,
    @GetUserDecorator() user: UserEntity
  ): Promise<void> {
    return this.todoService.delete(id, user)
  }

  
}
