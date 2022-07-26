import { IsEnum } from "class-validator";
import { TodoStatusEnum } from "../enums/todo-status.enum";

export class UpdateTodoDto {
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum
}