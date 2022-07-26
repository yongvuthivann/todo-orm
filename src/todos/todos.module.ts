import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./models/todo.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity]), AuthModule],
  providers: [TodosService],
  controllers: [TodosController]
})
export class TodosModule {}
