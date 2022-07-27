import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserEntity } from "./models/user.entity";


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get()
  // findUsers(): Promise<UserEntity[]> {
  //   return this.usersService.findUsers()
  // }
}
