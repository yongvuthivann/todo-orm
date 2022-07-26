import { IsString } from "class-validator";

export class CreateTodoDto {
  @IsString()
  todo: string;
}